import { useState } from 'react';

const AddStudentPopup = ({ isOpen, onClose, onAddStudent, role }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [url, setUrl] = useState('');



  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmitImage = (event) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', selectedImage);
  
    try {
      // Make a POST request to your server or an external API endpoint for image upload
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Image uploaded successfully
        const imageUrl = response.data;
  
        const newStudent = {
          name,
          age,
          grade,
          url: imageUrl,
          role,
        };
  
        // Call the onAddStudent function passed as a prop
        onAddStudent(newStudent);
  
        // Reset the form fields
        setName('');
        setAge('');
        setGrade('');
        setUrl('');
        onClose();
      } else {
        // Handle error if the image upload fails
        console.error('Image upload failed');
      }
    } catch (error) {
      // Handle any other errors that occur during the image upload
      console.error('Error uploading image:', error);
    }
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nameInput"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ageInput" className="block text-gray-700 text-sm font-bold mb-2">
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ageInput"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gradeInput" className="block text-gray-700 text-sm font-bold mb-2">
              Grade:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gradeInput"
              type="text"
              placeholder="Enter grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="schoolInput" className="block text-gray-700 text-sm font-bold mb-2">
Url:            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="schoolInput"
              type="text"
              placeholder="Enter url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
          <form onSubmit={handleSubmitImage}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPopup;
