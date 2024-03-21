export interface TeacherAdminOutput {
  id: string;
  email: string;
  role: 'teacher' | 'admin'; // narrow down the options for the role property
  name: string;
  image: string;
  emailVerified: string;
  userEstablishment: any; // consider renaming this property to better reflect its content
  subjects: any; // consider creating a separate type or interface for the subjects property
}
