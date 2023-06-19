import axios from 'axios'
import {useState, useEffect} from 'react'
import AddStudentPopup from "./AddStudentPopup"
import {nanoid} from 'nanoid'

interface Student {
    id?: string,
    name: string,
    age: number,
    grade: number,
    url: string,
    role: 'student',
    updated_at?: null,
    created_at?: null
}

const StudentTable: React.FC = () => {
    const [students, setStudents] = useState < Student[] > ([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(5)
    const [isPopupOpen, setPopupOpen] = useState(false);
    // const [students, setStudents] = useState([]);


    async function getStaticProps() {
        try {
            const response = await axios.get(`${
                process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/studentTeachers/student`);
            const data = response.data;
            // setStudents(data.props);
            console.log(data);
            data.forEach(element => {
                students.push(element)
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    getStaticProps(); // Invoke the function

    async function deleteUser(userId) {
        try {
            const response = await axios.delete(`http://localhost:8000/api/studentTeachers/delete/${userId}`);
            console.log(response.data); // Optional: Handle the response data
        } catch (error) {
            console.error(error); // Optional: Handle the error
        }
    }

    // const handleDeleteStudent = (studentId : string) => {
    //     axios.delete(`/studentTeachers/delete/${studentId}`).then(response => { // Successful deletion
    //         const updatedStudents = students.filter(student => student.id !== studentId);
    //         setStudents(updatedStudents);
    //         console.log(response.data.message);
    //     }).catch(error => { // Error handling
    //         console.log(error.response.data.error);
    //     });
    // };


    console.log(students, 'jjjj');

    const handleInputChange = (e : React.ChangeEvent < HTMLInputElement >) => {
        setSearchTerm(e.target.value)
    }

    const handleAddStudent = (newStudent : Omit < Student, 'id' >) => {
        const id = nanoid(); // Generate a unique ID using nanoid

        const studentWithId: Student = {
            ...newStudent,
            id: id
        };

        setStudents([
            ...students,
            studentWithId
        ]);

        const addStudent = async (studentData) => {
            try {
                const response = await axios.post('http://localhost:8000/api/students', studentData);
                console.log(response.data); // Optional: Handle the response
            } catch (error) {
                console.error(error);
            }
        };

        addStudent(studentWithId);
    };

    const handleDeleteStudent = (studentId : string) => {
        const updatedStudents = students.filter((student) => student.id !== studentId);
        setStudents(updatedStudents);
        deleteUser(studentId)
    };


    return (
        <div className="w-full px-12">
            <div className="flex items-center justify-between">
                <input type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search student"
                    className="px-4 py-2 mr-2 rounded-lg focus:border-transparent focus:ring-[#FEAF00]"/>
                <button onClick={
                        () => setPopupOpen(true)
                    }
                    className="px-4 py-2 bg-[#FEAF00] text-white rounded-md ">
                    Add Student
                </button>
                <AddStudentPopup isOpen={isPopupOpen}
                    onClose={
                        () => setPopupOpen(false)
                    }
                    onAddStudent={handleAddStudent}/>

            </div>

            <div className="w-full ">
                <ul className="grid grid-cols-5 my-4">
                    <li className=" py-2 place-self-start">Picture</li>
                    <li className=" py-2 place-self-start">Name</li>
                    <li className=" py-2 place-self-start">Age</li>
                    <li className=" py-2 place-self-start">Grade</li>
                    <li className=" py-2 place-self-start">Actions</li>
                </ul>

                <div className="w-full ">
                    {
                    students.map(student => (
                        <div key={
                                student.id
                            }
                            className="w-full grid grid-cols-5">
                            <img src={
                                    student.url
                                }
                                alt={
                                    student.name
                                }
                                className="h-16 w-16 rounded-full object-center object-cover"/>
                            <input type="text"
                                value={
                                    student.name
                                }
                                // onChange={
                                //     e => handleEditStudent(student.id, 'name', e.target.value,)
                                // }
                                className=" py-1 border-none "
                            />
                            <input type="number"
                                value={
                                    student.age
                                }
                                // onChange={
                                //     e => handleEditStudent(student.id, 'age', parseInt(e.target.value),)
                                // }
                                className=" py-1 border-none"
                            />
                            <input type="text"
                                value={
                                    student.grade
                                }
                                // onChange={
                                //     e => handleEditStudent(student.id, 'grade', e.target.value,)
                                // }
                                className=" py-1 border-none "
                            />
                            <button onClick={
                                    () => handleDeleteStudent(student.id)
                                }
                                className="px-4 py-2 bg-red-500 w-fit text-white rounded-md hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    ))
                } </div>
            </div>
        </div>
    )
}
export default StudentTable
