<?php

namespace App\Http\Controllers;

use App\Models\TeacherStudent;
use Illuminate\Http\Request;

class StudentTeacher extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($role)
    {
        $studentTeachers = TeacherStudent::where('role', $role)->get();
        return response()->json($studentTeachers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, TeacherStudent $teacherStudent)
    {
        $studentTeachers = new TeacherStudent;
        $studentTeachers->name = $request->input('name');
        $studentTeachers->age = $request->input('age');
        $studentTeachers->url = $request->input('url');
        $studentTeachers->grade = $request->input('grade');
        $studentTeachers->role = $request->input('role');
        $studentTeachers->save();

        return response()->json('Student created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TeacherStudent  $teacherStudent
     * @return \Illuminate\Http\Response
     */
    public function show(TeacherStudent $teacherStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TeacherStudent  $teacherStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
{
    $studentTeachers = TeacherStudent::findOrFail($id);
    
    $studentTeachers->name = $request->input('name');
    $studentTeachers->age = $request->input('age');
    $studentTeachers->grade = $request->input('grade');
    $studentTeachers->role = $request->input('role');
    $studentTeachers->url = $request->input('url');

    // Update other columns as needed

    $studentTeachers->save();

    return response()->json($studentTeachers);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TeacherStudent  $teacherStudent
     * @return \Illuminate\Http\Response
     */

     public function destroy($id)
    // public function destroy(TeacherStudent $teacherStudent)
    {
   
        try {
            $studentTeachers = TeacherStudent::findOrFail($id);
            $studentTeachers->delete();

            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user'], 500);
        }
    
    }
}
