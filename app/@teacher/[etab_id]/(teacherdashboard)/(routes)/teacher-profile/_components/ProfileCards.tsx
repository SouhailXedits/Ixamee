import React from 'react';
import InfoCard from './InfoCard';
import SecurityCard from './SecurityCard';

export default function ProfileCards({ user, userEstablishment, teachersubject }: any) {
  return (
    <div className="flex  w-full h-full gap-10 p-3 max-xl:flex-col ">
      <InfoCard user={user} userEstablishment={userEstablishment} teachersubject={teachersubject} />
      <SecurityCard user={user}/>
    </div>
  );
}
