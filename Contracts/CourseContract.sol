// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CourseMarketplace {
    struct Course {
        address instructor;
        string title;
        uint256 price;
        bool isAvailable;
    }

    struct Student {
        uint256 token;
        Course public enrolledIn[];
    }

    mapping(address => Student) public studentInfo;
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => bool)) public purchasedCourses;

    event CourseCreated(
        address indexed instructor,
        uint256 courseId,
        string title,
        uint256 price
    );
    event CoursePurchased(
        address indexed student,
        uint256 courseId,
        address indexed instructor,
        uint256 amountPaid
    );
    event CourseCompleted(address indexed student, uint256 courseId);

    function createCourse(string memory _title, uint256 _price) public {
        uint256 courseId = uint256(
            keccak256(abi.encodePacked(msg.sender, _title, block.timestamp))
        );
        courses[courseId] = Course(msg.sender, _title, _price, true);
        emit CourseCreated(msg.sender, courseId, _title, _price);
    }

    function buyCourse(uint256 _courseId) public payable {
        require(courses[_courseId].isAvailable, "Course is not available");
        require(msg.value >= courses[_courseId].price, "Insufficient funds");

        courses[_courseId].isAvailable = true; // Allow multiple purchases of the same course
        purchasedCourses[_courseId][msg.sender] = true;
        payable(courses[_courseId].instructor).transfer(msg.value); // Pay directly to the instructor
        studentInfo[msg.sender].enrolledIn.push(_courseId);
        emit CoursePurchased(
            msg.sender,
            _courseId,
            courses[_courseId].instructor,
            msg.value
        );
    }

    function completeCourse(uint256 _courseId) public {
        require(
            purchasedCourses[_courseId][msg.sender],
            "Course not purchased"
        );
        emit CourseCompleted(msg.sender, _courseId);
    }

    function verifyCoursePurchase(
        uint256 _courseId,
        address _student
    ) public view returns (bool) {
        return purchasedCourses[_courseId][_student];
    }
}
