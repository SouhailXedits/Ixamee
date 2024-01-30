import React from 'react';

export default function page({ params } :{
  params: {
    classesId: string;
    student_id: string;
    exam_id: string;
  };}) {
  console.log(params);
  return <div>page</div>;
}
