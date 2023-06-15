import {useState} from 'react'

interface Student {
    id: number name: string age: number grade: string picture: string
}

const StudentTable: React.FC = () => {
    const [students, setStudents] = useState < Student[] > ([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(5)

    const handleInputChange = (e : React.ChangeEvent < HTMLInputElement >) => {
        setSearchTerm(e.target.value)
    }

    const handleAddStudent = () => { // Logic to add a new student
        const newStudent: Student = {
            id: students.length + 1,
            name: 'New Student',
            age: 0,
            grade: 'N/A',
            picture: ''
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
                            <img src={
                                    student.picture
                                }
                                alt={
                                    student.name
                                }
                                className="h-10 w-10 rounded-full"/>
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
