import axios from 'axios'
import {useState, useEffect} from 'react'
import AddStudentPopup from "./AddStudentPopup"

interface Student {
    id: number,
    name: string,
    age: number,
    grade: number,
    url: string,
    role: 'student',
    updated_at: null,
    created_at: null
}

const StudentTable: React.FC = () => {
    const [students, setStudents] = useState < Student[] > ([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(5)
    const [isPopupOpen, setPopupOpen] = useState(false);
    // const [students, setStudents] = useState([]);

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

    }, []);


    console.log(students, 'jjjj');

    // const handleInputChange = (e : React.ChangeEvent < HTMLInputElement >) => {
    //     setSearchTerm(e.target.value)
    // }

    const handleAddStudent = (newStudent : Student) => {
        setStudents([
            ...students,
            newStudent
        ]);
    };

    const handleDeleteStudent = (id : number) => { // Logic to delete a student by ID
        const updatedStudents = students.filter(student => student.id !== id)
        setStudents(updatedStudents)
    }

    // const handleEditStudent = (id : number, field : keyof Student, value : any,) => { // Logic to edit a student field
    //     const updatedStudents = students.map(student => {
    //         if (student.id === id) {
    //             return {
    //                 ...student,
    //                 [field]: value
    //             }
    //         }
    //         return student
    //     })
    //     setStudents(updatedStudents)
    // }

    // Filter students based on the search term
    // const filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()),)

    // Get current students for pagination
    // const indexOfLastStudent = currentPage * studentsPerPage
    // const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    // const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent,)

    // // Change page
    const paginate = (pageNumber : number) => setCurrentPage(pageNumber)

    return (
        <div className="w-full px-12">
            <div className="flex items-center justify-between">
                <input type="text"
                    value={searchTerm}
                    // onChange={handleInputChange}
                    placeholder="Search student"
                    className="px-4 py-2 mr-2 rounded-lg focus:border-transparent focus:ring-[#FEAF00]"
                />
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

            {/* Pagination */}
            <div className="w-full">
                {
                students.length > studentsPerPage && (
                    <nav className="flex justify-center">
                        <ul className="flex">
                            {
                            Array(Math.ceil(students.length / studentsPerPage,),).fill(0).map((_, index) => (
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
