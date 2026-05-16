import { Student, CreateStudentInput } from "../types/Student";
import { getToken } from "../utils/auth";

// The base URL for all API requests
// Replace this with the URL from your own MockAPI.io project
const BASE_URL = "https://69ecd736af4ff533142b7203.mockapi.io";

// Builds the headers sent with every request.
// Always includes Content-Type, and adds the auth token if the user is logged in.
function getHeaders(): { [key: string]: string } {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// A helper that sends an HTTP request and returns the result as a JavaScript object.
// If the server returns an error status, it throws an Error so the caller can catch it.
async function sendRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: getHeaders(),
  });

  // If the server responded with an error (e.g. 404 Not Found, 500 Server Error)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // Parse and return the JSON body from the response
  return response.json();
}

// Mock data fallback when API is unavailable
let mockStudents: Student[] = [
  {
    id: "1",
    name: "Abebe Kebede",
    rollNo: "023045346",
    department: "Computing Technologies Department",
    email: "abebe.kebede@university.edu",
    year: 3,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Tigist Haile",
    rollNo: "023045347",
    department: "Computer Science Department",
    email: "tigist.haile@university.edu",
    year: 2,
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Dawit Abebe",
    rollNo: "023045348",
    department: "Software Engineering Department",
    email: "dawit.abebe@university.edu",
    year: 4,
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

// Get the full list of students from the server
export async function getAllStudents(): Promise<Student[]> {
  try {
    return await sendRequest<Student[]>(`${BASE_URL}/students`);
  } catch (error) {
    console.log("API unavailable, using mock data");
    return mockStudents;
  }
}

// Get a single student by their unique ID
export async function getStudentById(id: string): Promise<Student> {
  try {
    return await sendRequest<Student>(`${BASE_URL}/students/${id}`);
  } catch (error) {
    console.log("API unavailable, using mock data");
    const student = mockStudents.find(s => s.id === id);
    if (!student) throw new Error("Student not found");
    return student;
  }
}

// Create a new student on the server
export async function createStudent(
  studentData: CreateStudentInput,
): Promise<Student> {
  try {
    return await sendRequest<Student>(`${BASE_URL}/students`, {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  } catch (error) {
    console.log("API unavailable, using mock data");
    const newStudent: Student = {
      ...studentData,
      id: String(mockStudents.length + 1),
    };
    mockStudents = [newStudent, ...mockStudents];
    return newStudent;
  }
}

// Update an existing student's data on the server
export async function updateStudent(
  id: string,
  studentData: CreateStudentInput,
): Promise<Student> {
  try {
    return await sendRequest<Student>(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    });
  } catch (error) {
    console.log("API unavailable, using mock data");
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) throw new Error("Student not found");
    const updatedStudent: Student = { ...studentData, id };
    mockStudents[index] = updatedStudent;
    return updatedStudent;
  }
}

// Delete a student from the server
export async function deleteStudent(id: string): Promise<void> {
  try {
    await sendRequest(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("API unavailable, using mock data");
    mockStudents = mockStudents.filter(s => s.id !== id);
  }
}
