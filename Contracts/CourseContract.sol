// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CourseMarketplace {
    address public owner; // Owner of the contract

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the deployer address as the owner
    }

    struct Course {
        address payable instructor; // Declare instructor as payable
        string title;
        uint256 price;
    }

    struct Student {
        uint256 token;
        uint256 count;
        uint256[] enrolledIn;
    }

    mapping(address => Student) public studentInfo;
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => bool)) public purchasedCourses;

    mapping(uint256 => uint256) public extraAmount; // Mapping to store extra amount for each course

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
    event ExtraAmountWithdrawn(address indexed owner, uint256 amount);

    uint256 public nextCourseId = 1; // Track the next available course ID

    function createCourse(string memory _title, uint256 _price) public {
        uint256 courseId = nextCourseId; // Use the next available course ID
        courses[courseId] = Course(payable(msg.sender), _title, _price);
        nextCourseId++; // Increment the next available course ID for the next course
        emit CourseCreated(msg.sender, courseId, _title, _price);
    }

    function getCountOfCourses() public view returns (uint256) {
        return studentInfo[msg.sender].count;
    }

    function getCourseOfStudent(uint256 _index) public view returns (uint256) {
        return studentInfo[msg.sender].enrolledIn[_index];
    }

    function buyCourse(uint256 _courseId) public payable {
        Course storage course = courses[_courseId];
        require(course.instructor != address(0), "Course does not exist");
        require(msg.value >= course.price, "Insufficient funds");
        require(!purchasedCourses[_courseId][msg.sender], "Course already purchased");

        uint256 extra = course.price / 10; // Calculate 10% of course price as extra amount

        // Transfer course price to instructor
        pay(course.instructor, course.price);

        // Store extra amount in contract balance
        extraAmount[_courseId] += extra;

        // Update purchasedCourses mapping and studentInfo
        purchasedCourses[_courseId][msg.sender] = true;
        studentInfo[msg.sender].enrolledIn.push(_courseId);
        studentInfo[msg.sender].count++;

        emit CoursePurchased(
            msg.sender,
            _courseId,
            course.instructor,
            course.price // Report only the course price paid
        );
    }

    function pay(address payable _receiver, uint256 _amount) private {
        _receiver.transfer(_amount);
    }

    function completeCourse(uint256 _courseId, address _student) public onlyOwner {
        require(purchasedCourses[_courseId][_student], "Course not purchased by the specified student");
        emit CourseCompleted(_student, _courseId);
    }

    function withdrawExtraAmount() public onlyOwner {
        uint256 totalExtra = 0;

        for (uint256 i = 1; i < nextCourseId; i++) {
            totalExtra += extraAmount[i];
            extraAmount[i] = 0; // Clear extra amount after withdrawal
        }

        require(totalExtra > 0, "No extra amount available for withdrawal");

        payable(owner).transfer(totalExtra); // Transfer extra amount to owner
        emit ExtraAmountWithdrawn(owner, totalExtra);
    }

    function verifyCoursePurchase(uint256 _courseId, address _student) public view returns (bool) {
        return purchasedCourses[_courseId][_student];
    }
}