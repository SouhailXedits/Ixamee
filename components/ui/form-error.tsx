import { InfoCircledIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
      <InfoCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

interface FormErrorListProps {
  formErrors: FormErrorProps[];
}

const FormErrorList: React.FC<FormErrorListProps> = ({ formErrors }) => {
  return (
    <div>
      {formErrors.map((error) => (
        <FormError key={error.message} {...error} />
      ))}
    </div>
  );
}

export default FormErrorList;
