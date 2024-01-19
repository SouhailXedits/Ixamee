import React, { startTransition, useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import { VerifSchema } from '@/actions/auth/schemas';
import { CodeInput } from './CodeInput';
import bcryptjs from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { sendPasswordResetToken } from '@/actions/auth/sendPasswordResetToken';
interface VerificationData {
  email?: string | undefined;
  code?: number | undefined;
}
const VerificationCodeForm: React.FC = ({ email, code }: VerificationData) => {
  const [codeValues, setCodeValues] = useState(['', '', '', '', '', '']);

  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined>('');
  const [isCodeSuccessful, setCodeSuccessful] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof VerifSchema>>({
    resolver: zodResolver(VerifSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleCodeChange = (index: number, value: string) => {
    const newCodeValues = [...codeValues];
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
    setIsCodeValid(newCodeValues.every((code) => code.length === 1));
  };
  const [isTransPending, startTransition] = useTransition();
  const getVerificationCode = () => {
    return codeValues.join('');
  };
  const onSubmit = async () => {
    setError('');
    try {
      const verificationCode = getVerificationCode();
      const storedVerificationData = JSON.parse(localStorage.getItem('email-verification') || '{}');
      if (codeValues) {
        const codeMatch = await bcryptjs.compare(verificationCode, storedVerificationData.code);

        if (email && codeMatch) {
          setIsCodeCorrect(true);
          startTransition(() => {
            sendPasswordResetToken(storedVerificationData.email);
          });
        } else {
          setIsCodeCorrect(false);
          setError('Code incorrect, réessayez.');
        }
      }
    } catch (error) {
      setError("Quelque chose s'est mal passé");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={error} />
        <div className="flex mb-2 gap-2 rtl:space-x-reverse justify-between">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CodeInput
              key={index}
              id={`code-${index}`}
              prevId={`code-${index - 1}`}
              nextId={`code-${index + 1}`}
              value={codeValues[index - 1]}
              onChange={(value) => handleCodeChange(index - 1, value)}
              isValid={isCodeCorrect}
            />
          ))}
        </div>
        <Button
          type="submit"
          className={`${
            isCodeValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Vérifier
        </Button>
      </form>
    </Form>
  );
};

export default VerificationCodeForm;
