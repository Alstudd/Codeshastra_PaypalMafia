export const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_courseId",
          type: "uint256",
        },
      ],
      name: "buyCourse",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_courseId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_student",
          type: "address",
        },
      ],
      name: "completeCourse",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "student",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "courseId",
          type: "uint256",
        },
      ],
      name: "CourseCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "instructor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "courseId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "CourseCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "student",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "courseId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "instructor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountPaid",
          type: "uint256",
        },
      ],
      name: "CoursePurchased",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "createCourse",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "courses",
      outputs: [
        {
          internalType: "address payable",
          name: "instructor",
          type: "address",
        },
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCountOfCourses",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "getCourseOfStudent",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nextCourseId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "purchasedCourses",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "studentInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "token",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "count",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_courseId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_student",
          type: "address",
        },
      ],
      name: "verifyCoursePurchase",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  