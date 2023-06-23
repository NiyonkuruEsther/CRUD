import {useState} from 'react';
import {BiUpload} from 'react-icons/bi';

interface AddStudentPopupProp {
    isOpen: boolean;
    onClose: () => void;
    onAddStudent: (arg : any) => void;
    role: string

}

const AddStudentPopup = ({isOpen, onClose, onAddStudent, role} : AddStudentPopupProp) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [url, setUrl] = useState < string | ArrayBuffer | null > ('');

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            setUrl(imageUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();


        const newStudent = {
            name,
            age,
            grade,
            url,
            role: role

        };

        onAddStudent(newStudent);

        setName('');
        setAge('');
        setGrade('');
        setUrl('');

        onClose();
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add {role}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nameInput" className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nameInput" type="text" placeholder="Enter name"
                            value={name}
                            onChange={
                                e => setName(e.target.value)
                            }/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ageInput" className="block text-gray-700 text-sm font-bold mb-2">
                            Age:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ageInput" type="number" placeholder="Enter age"
                            value={age}
                            onChange={
                                e => setAge(e.target.value)
                            }/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gradeInput" className="block text-gray-700 text-sm font-bold mb-2">
                            Grade:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gradeInput" type="text" placeholder="Enter grade"
                            value={grade}
                            onChange={
                                e => setGrade(e.target.value)
                            }/>
                    </div>

                    <form className="border p-4 my-4">

                        <input type="file" id="file-upload" className="hidden"
                            onChange={handleImageUpload}/> {
                        url ? (
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer">
                                <BiUpload size={60}
                                    className='text-orange-500'/>
                                <div>
                                    <p className="text-base text-center text-green-600">
                                        <span className='leading-5 font-semibold text-black'>Image uploaded {" "} </span>
                                        successfully</p>
                                </div>
                            </label>
                        ) : (
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer">
                                <BiUpload size={60}
                                    className='text-orange-500'/>
                                <div>
                                    <p className="text-base text-center text-primaryBlack">
                                        <span className='leading-5 font-semibold'>Click to upload {" "} </span>
                                        or drag and drop image</p>
                                </div>
                            </label>
                        )
                    } </form>
                    <div className="flex justify-end">
                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentPopup;
