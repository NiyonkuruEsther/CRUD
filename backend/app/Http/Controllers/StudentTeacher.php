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
    public function index()
    {
        $studentTeachers = TeacherStudent::where('role', 'teacher')->get();
        return response()->json($studentTeachers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $studentTeacher = new StudentTeacher();
        $studentTeacher->name = $request->input('name');
        $studentTeacher->email = $request->input('age');
        $studentTeacher->email = $request->input('grade');
        $studentTeacher->email = $request->input('role');
        $studentTeacher->email = $request->input('url');


        // Set other attributes as needed
        $studentTeacher->save();
    
        return response()->json($studentTeacher, 201);}

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
    public function update(Request $request, TeacherStudent $teacherStudent)
    {
        $studentTeacher = StudentTeacher::findOrFail($id);
    
        $studentTeacher->name = $request->input('name');
        $studentTeacher->email = $request->input('age');
        $studentTeacher->email = $request->input('grade');
        $studentTeacher->email = $request->input('role');
        $studentTeacher->email = $request->input('url');

        // Update other columns as needed
    
        $studentTeacher->save();
    
        return response()->json($studentTeacher);    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TeacherStudent  $teacherStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(TeacherStudent $teacherStudent)
    {
        //
    }
}
