import axios from 'axios'
import {useState, useEffect} from 'react'

interface Student {
    id: number,
    name: string,
    age: number,
    grade: number,
    picture: string,
    role: 'student',
    updated_at: null,
    created_at: null
}

const StudentTable: React.FC = () => {
    const [students, setStudents] = useState < Student[] > ([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(5)

    const handleUpdate = async () => {
        const id = 1; // Provide the ID of the record you want to update
        const data = {
            name: 'New Name',
            email: 'new@example.com',
            // Provide other column values as needed
        };

        try {
            const response = await axios.get(`http://localhost:8000/studentTeachers/teacher`);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    useEffect(() => {
        async function getStaticProps() {
            try {
                const response = await axios.get(`${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                }/api/studentTeachers/teacher`);
                const data = response.data;
                setStudents(data.props);
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        getStaticProps(); // Invoke the function

    }, []);


    console.log(students, 'jjjj');

    const handleInputChange = (e : React.ChangeEvent < HTMLInputElement >) => {
        setSearchTerm(e.target.value)
    }

    const handleAddStudent = () => { // Logic to add a new student
        const newStudent: Student = {
            id: students.length + 1,
            name: 'New Student',
            age: 0,
            grade: 0,
            picture: '',
            role: 'student'
        }

        setStudents([
            ...students,
            newStudent
        ])
    }

    const handleDeleteStudent = (id : number) => { // Logic to delete a student by ID
        const updatedStudents = students.filter(student => student.id !== id)
        setStudents(updatedStudents)
    }

    const handleEditStudent = (id : number, field : keyof Student, value : any,) => { // Logic to edit a student field
        const updatedStudents = students.map(student => {
            if (student.id === id) {
                return {
                    ...student,
                    [field]: value
                }
            }
            return student
        })
        setStudents(updatedStudents)
    }

    // Filter students based on the search term
    const filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()),)

    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent,)

    // Change page
    const paginate = (pageNumber : number) => setCurrentPage(pageNumber)

    return (
        <div className="w-full px-12">
            <div className="flex items-center justify-between">
                <input type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search student"
                    className="px-4 py-2 mr-2 rounded-lg focus:border-transparent focus:ring-[#FEAF00]"/>
                <button onClick={handleAddStudent}
                    className="px-4 py-2 bg-[#FEAF00] text-white rounded-md ">
                    Add Student
                </button>
            </div>

            <table className="w-full ">
                <thead className="w-full  ">
                    <tr className="grid grid-cols-5 my-4">
                        <th className=" py-2 place-self-start">Picture</th>
                        <th className=" py-2 place-self-start">Name</th>
                        <th className=" py-2 place-self-start">Age</th>
                        <th className=" py-2 place-self-start">Grade</th>
                        <th className=" py-2 place-self-start">Actions</th>
                    </tr>
                </thead>
                <div className="w-full ">
                    {
                    currentStudents.map(student => (
                        <div key={
                                student.id
                            }
                            className="w-full grid grid-cols-5">
                            <img src={"data:image/jpeg;base64,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"}
                                alt={
                                    student.name
                                }
                                className="h-16 w-16 rounded-full object-center object-cover"/>
                            <input type="text"
                                value={
                                    student.name
                                }
                                onChange={
                                    e => handleEditStudent(student.id, 'name', e.target.value,)
                                }
                                className=" py-1 border-none "/>
                            <input type="number"
                                value={
                                    student.age
                                }
                                onChange={
                                    e => handleEditStudent(student.id, 'age', parseInt(e.target.value),)
                                }
                                className=" py-1 border-none"/>
                            <input type="text"
                                value={
                                    student.grade
                                }
                                onChange={
                                    e => handleEditStudent(student.id, 'grade', e.target.value,)
                                }
                                className=" py-1 border-none "/>
                            <button onClick={
                                    () => handleDeleteStudent(student.id)
                                }
                                className="px-4 py-2 bg-red-500 w-fit text-white rounded-md hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    ))
                } </div>
            </table>

            {/* Pagination */}
            <div className="w-full">
                {
                filteredStudents.length > studentsPerPage && (
                    <nav className="flex justify-center">
                        <ul className="flex">
                            {
                            Array(Math.ceil(filteredStudents.length / studentsPerPage,),).fill(0).map((_, index) => (
                                <li key={index}>
                                    <button onClick={
                                            () => paginate(index + 1)
                                        }
                                        className={
                                            `px-4 py-2 ${
                                                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                            }`
                                    }>
                                        {
                                        index + 1
                                    } </button>
                                </li>
                            ))
                        } </ul>
                    </nav>
                )
            } </div>
        </div>
    )
}

export default StudentTable
