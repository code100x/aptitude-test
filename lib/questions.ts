const mathQuestions = [
    {
      id: 1,
      question: "What is the value of 2 + 2?",
      options: [
        { optionId: 1, text: "3" },
        { optionId: 2, text: "4" },
        { optionId: 3, text: "5" },
        { optionId: 4, text: "6" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 5,
      explanation: "2 + 2 equals 4.",
      tags: ["addition", "basic arithmetic"],
      timeLimit: 15,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 2,
      question: "If x = 3 and y = 4, what is the value of x^2 + y^2?",
      options: [
        { optionId: 1, text: "25" },
        { optionId: 2, text: "12" },
        { optionId: 3, text: "9" },
        { optionId: 4, text: "18" }
      ],
      correctOptionId: 1,
      category: "Algebra",
      difficulty: "easy",
      points: 10,
      explanation: "x^2 + y^2 = 3^2 + 4^2 = 9 + 16 = 25.",
      tags: ["algebra", "quadratic"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 3,
      question: "What is the sum of the first 10 natural numbers?",
      options: [
        { optionId: 1, text: "45" },
        { optionId: 2, text: "50" },
        { optionId: 3, text: "55" },
        { optionId: 4, text: "60" }
      ],
      correctOptionId: 3,
      category: "Arithmetic",
      difficulty: "medium",
      points: 15,
      explanation: "The sum of the first n natural numbers is n(n+1)/2. For n=10, the sum is 10(11)/2 = 55.",
      tags: ["sum", "natural numbers"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 4,
      question: "What is the area of a circle with a radius of 7 units?",
      options: [
        { optionId: 1, text: "154 square units" },
        { optionId: 2, text: "44 square units" },
        { optionId: 3, text: "28 square units" },
        { optionId: 4, text: "98 square units" }
      ],
      correctOptionId: 1,
      category: "Geometry",
      difficulty: "medium",
      points: 20,
      explanation: "The area of a circle is πr^2. For r=7, area = 22/7 * 7^2 = 154 square units.",
      tags: ["circle", "area"],
      timeLimit: 45,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 5,
      question: "What is the least common multiple (LCM) of 12 and 15?",
      options: [
        { optionId: 1, text: "45" },
        { optionId: 2, text: "30" },
        { optionId: 3, text: "60" },
        { optionId: 4, text: "90" }
      ],
      correctOptionId: 3,
      category: "Number Theory",
      difficulty: "medium",
      points: 20,
      explanation: "LCM of 12 and 15 is the smallest number that is divisible by both, which is 60.",
      tags: ["LCM", "multiples"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 6,
      question: "If a triangle has sides 3 cm, 4 cm, and 5 cm, what is the triangle?",
      options: [
        { optionId: 1, text: "Equilateral" },
        { optionId: 2, text: "Isosceles" },
        { optionId: 3, text: "Scalene" },
        { optionId: 4, text: "Right-angled" }
      ],
      correctOptionId: 4,
      category: "Geometry",
      difficulty: "medium",
      points: 20,
      explanation: "The triangle is a right-angled triangle as it satisfies Pythagoras theorem: 3^2 + 4^2 = 5^2.",
      tags: ["triangle", "Pythagoras"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 7,
      question: "What is the square root of 144?",
      options: [
        { optionId: 1, text: "10" },
        { optionId: 2, text: "12" },
        { optionId: 3, text: "14" },
        { optionId: 4, text: "16" }
      ],
      correctOptionId: 2,
      category: "Algebra",
      difficulty: "easy",
      points: 10,
      explanation: "The square root of 144 is 12.",
      tags: ["square root", "basic algebra"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 8,
      question: "What is the value of 7! (7 factorial)?",
      options: [
        { optionId: 1, text: "720" },
        { optionId: 2, text: "5040" },
        { optionId: 3, text: "40320" },
        { optionId: 4, text: "120" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "hard",
      points: 25,
      explanation: "7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040.",
      tags: ["factorial", "permutations"],
      timeLimit: 45,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 9,
      question: "What is the value of the expression: 5^3 × 5^2?",
      options: [
        { optionId: 1, text: "25" },
        { optionId: 2, text: "125" },
        { optionId: 3, text: "625" },
        { optionId: 4, text: "3125" }
      ],
      correctOptionId: 4,
      category: "Algebra",
      difficulty: "medium",
      points: 15,
      explanation: "5^3 × 5^2 = 5^(3+2) = 5^5 = 3125.",
      tags: ["exponents", "algebra"],
      timeLimit: 40,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 10,
      question: "What is the greatest common divisor (GCD) of 48 and 180?",
      options: [
        { optionId: 1, text: "6" },
        { optionId: 2, text: "12" },
        { optionId: 3, text: "24" },
        { optionId: 4, text: "36" }
      ],
      correctOptionId: 2,
      category: "Number Theory",
      difficulty: "medium",
      points: 20,
      explanation: "GCD of 48 and 180 is the largest number that divides both, which is 12.",
      tags: ["GCD", "divisors"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 11,
      question: "What is the value of π (pi) to 3 decimal places?",
      options: [
        { optionId: 1, text: "3.141" },
        { optionId: 2, text: "3.142" },
        { optionId: 3, text: "3.143" },
        { optionId: 4, text: "3.144" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 10,
      explanation: "π is approximately 3.142 to 3 decimal places.",
      tags: ["pi", "basic arithmetic"],
      timeLimit: 15,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 12,
      question: "In a right triangle, if one angle is 45°, what is the measure of the other non-right angle?",
      options: [
        { optionId: 1, text: "30°" },
        { optionId: 2, text: "45°" },
        { optionId: 3, text: "60°" },
        { optionId: 4, text: "90°" }
      ],
      correctOptionId: 2,
      category: "Geometry",
      difficulty: "easy",
      points: 10,
      explanation: "In a right triangle, the sum of angles is 180°. The other angle is 90° - 45° = 45°.",
      tags: ["triangle", "angles"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 13,
      question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
      options: [
        { optionId: 1, text: "26 cm" },
        { optionId: 2, text: "40 cm" },
        { optionId: 3, text: "16 cm" },
        { optionId: 4, text: "30 cm" }
      ],
      correctOptionId: 4,
      category: "Geometry",
      difficulty: "easy",
      points: 10,
      explanation: "The perimeter of a rectangle is 2(l + w) = 2(8 + 5) = 26 cm.",
      tags: ["rectangle", "perimeter"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 14,
      question: "If 3x + 5 = 20, what is the value of x?",
      options: [
        { optionId: 1, text: "3" },
        { optionId: 2, text: "5" },
        { optionId: 3, text: "8" },
        { optionId: 4, text: "10" }
      ],
      correctOptionId: 1,
      category: "Algebra",
      difficulty: "medium",
      points: 15,
      explanation: "3x + 5 = 20; 3x = 15; x = 15/3 = 5.",
      tags: ["linear equations", "algebra"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 15,
      question: "What is the probability of getting a head when a fair coin is tossed?",
      options: [
        { optionId: 1, text: "0.5" },
        { optionId: 2, text: "1" },
        { optionId: 3, text: "0.25" },
        { optionId: 4, text: "0" }
      ],
      correctOptionId: 1,
      category: "Probability",
      difficulty: "easy",
      points: 10,
      explanation: "The probability of getting a head when a fair coin is tossed is 0.5.",
      tags: ["probability", "basic arithmetic"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 16,
      question: "What is the derivative of x^2 with respect to x?",
      options: [
        { optionId: 1, text: "x" },
        { optionId: 2, text: "2x" },
        { optionId: 3, text: "3x" },
        { optionId: 4, text: "x^2" }
      ],
      correctOptionId: 2,
      category: "Calculus",
      difficulty: "medium",
      points: 20,
      explanation: "The derivative of x^2 with respect to x is 2x.",
      tags: ["derivatives", "calculus"],
      timeLimit: 40,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 17,
      question: "What is the next number in the sequence: 2, 6, 12, 20, ...?",
      options: [
        { optionId: 1, text: "24" },
        { optionId: 2, text: "30" },
        { optionId: 3, text: "36" },
        { optionId: 4, text: "42" }
      ],
      correctOptionId: 2,
      category: "Sequences",
      difficulty: "medium",
      points: 20,
      explanation: "The pattern is adding consecutive even numbers: 4, 6, 8, ... The next number is 30.",
      tags: ["sequences", "number patterns"],
      timeLimit: 35,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 18,
      question: "What is the area of a triangle with base 10 cm and height 6 cm?",
      options: [
        { optionId: 1, text: "30 cm²" },
        { optionId: 2, text: "40 cm²" },
        { optionId: 3, text: "50 cm²" },
        { optionId: 4, text: "60 cm²" }
      ],
      correctOptionId: 1,
      category: "Geometry",
      difficulty: "medium",
      points: 15,
      explanation: "The area of a triangle is 1/2 × base × height = 1/2 × 10 × 6 = 30 cm².",
      tags: ["triangle", "area"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 19,
      question: "What is the remainder when 10 is divided by 3?",
      options: [
        { optionId: 1, text: "1" },
        { optionId: 2, text: "2" },
        { optionId: 3, text: "3" },
        { optionId: 4, text: "4" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 10,
      explanation: "10 divided by 3 equals 3 with a remainder of 1.",
      tags: ["division", "remainders"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 20,
      question: "What is the value of log10(100)?",
      options: [
        { optionId: 1, text: "1" },
        { optionId: 2, text: "2" },
        { optionId: 3, text: "3" },
        { optionId: 4, text: "4" }
      ],
      correctOptionId: 2,
      category: "Algebra",
      difficulty: "medium",
      points: 20,
      explanation: "log10(100) = 2 because 10^2 = 100.",
      tags: ["logarithms", "exponents"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 21,
      question: "What is the hypotenuse of a right triangle with sides 5 cm and 12 cm?",
      options: [
        { optionId: 1, text: "10 cm" },
        { optionId: 2, text: "13 cm" },
        { optionId: 3, text: "15 cm" },
        { optionId: 4, text: "17 cm" }
      ],
      correctOptionId: 2,
      category: "Geometry",
      difficulty: "medium",
      points: 15,
      explanation: "Using the Pythagorean theorem: hypotenuse^2 = 5^2 + 12^2 = 25 + 144 = 169; hypotenuse = √169 = 13 cm.",
      tags: ["Pythagoras", "triangles"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 22,
      question: "What is the cube root of 27?",
      options: [
        { optionId: 1, text: "2" },
        { optionId: 2, text: "3" },
        { optionId: 3, text: "4" },
        { optionId: 4, text: "5" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 10,
      explanation: "The cube root of 27 is 3.",
      tags: ["cube root", "basic arithmetic"],
      timeLimit: 15,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 23,
      question: "What is the value of 8 + 4 ÷ 2?",
      options: [
        { optionId: 1, text: "6" },
        { optionId: 2, text: "10" },
        { optionId: 3, text: "12" },
        { optionId: 4, text: "16" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 10,
      explanation: "According to the order of operations (PEMDAS/BODMAS), 4 ÷ 2 = 2, then 8 + 2 = 10.",
      tags: ["order of operations", "basic arithmetic"],
      timeLimit: 15,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 24,
      question: "What is the sum of the interior angles of a pentagon?",
      options: [
        { optionId: 1, text: "360°" },
        { optionId: 2, text: "540°" },
        { optionId: 3, text: "720°" },
        { optionId: 4, text: "900°" }
      ],
      correctOptionId: 2,
      category: "Geometry",
      difficulty: "medium",
      points: 20,
      explanation: "The sum of the interior angles of a polygon is given by (n-2) × 180°, where n is the number of sides. For a pentagon, n=5, so sum = 3 × 180° = 540°.",
      tags: ["polygons", "angles"],
      timeLimit: 35,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 25,
      question: "What is the 5th prime number?",
      options: [
        { optionId: 1, text: "7" },
        { optionId: 2, text: "11" },
        { optionId: 3, text: "13" },
        { optionId: 4, text: "17" }
      ],
      correctOptionId: 3,
      category: "Number Theory",
      difficulty: "medium",
      points: 15,
      explanation: "The first five prime numbers are 2, 3, 5, 7, and 11. So, the 5th prime number is 11.",
      tags: ["prime numbers", "number theory"],
      timeLimit: 25,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 26,
      question: "What is the value of 2^5?",
      options: [
        { optionId: 1, text: "16" },
        { optionId: 2, text: "32" },
        { optionId: 3, text: "64" },
        { optionId: 4, text: "128" }
      ],
      correctOptionId: 2,
      category: "Algebra",
      difficulty: "easy",
      points: 10,
      explanation: "2^5 = 2 × 2 × 2 × 2 × 2 = 32.",
      tags: ["exponents", "basic arithmetic"],
      timeLimit: 15,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 27,
      question: "What is the product of the roots of the equation x^2 - 5x + 6 = 0?",
      options: [
        { optionId: 1, text: "1" },
        { optionId: 2, text: "2" },
        { optionId: 3, text: "3" },
        { optionId: 4, text: "6" }
      ],
      correctOptionId: 4,
      category: "Algebra",
      difficulty: "medium",
      points: 20,
      explanation: "The product of the roots of a quadratic equation ax^2 + bx + c = 0 is given by c/a. Here, c = 6 and a = 1, so the product is 6.",
      tags: ["quadratic equations", "roots"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 28,
      question: "If the circumference of a circle is 31.4 cm, what is the diameter of the circle? (Use π = 3.14)",
      options: [
        { optionId: 1, text: "5 cm" },
        { optionId: 2, text: "10 cm" },
        { optionId: 3, text: "15 cm" },
        { optionId: 4, text: "20 cm" }
      ],
      correctOptionId: 2,
      category: "Geometry",
      difficulty: "medium",
      points: 15,
      explanation: "Circumference = π × diameter. Therefore, diameter = circumference/π = 31.4/3.14 = 10 cm.",
      tags: ["circle", "diameter"],
      timeLimit: 35,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 29,
      question: "What is the smallest positive integer divisible by both 18 and 24?",
      options: [
        { optionId: 1, text: "36" },
        { optionId: 2, text: "54" },
        { optionId: 3, text: "72" },
        { optionId: 4, text: "108" }
      ],
      correctOptionId: 3,
      category: "Number Theory",
      difficulty: "medium",
      points: 20,
      explanation: "The smallest positive integer divisible by both 18 and 24 is the LCM, which is 72.",
      tags: ["LCM", "multiples"],
      timeLimit: 30,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    },
    {
      id: 30,
      question: "What is the value of 0! (0 factorial)?",
      options: [
        { optionId: 1, text: "0" },
        { optionId: 2, text: "1" },
        { optionId: 3, text: "undefined" },
        { optionId: 4, text: "infinity" }
      ],
      correctOptionId: 2,
      category: "Arithmetic",
      difficulty: "easy",
      points: 10,
      explanation: "By definition, 0! = 1.",
      tags: ["factorial", "basic arithmetic"],
      timeLimit: 20,
      createdBy: "admin",
      dateCreated: "2024-08-22",
      lastUpdated: "2024-08-22"
    }
  ];
  