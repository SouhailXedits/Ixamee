import React from 'react';
import Link from 'next/link';
import { Box, Button } from '@mui/material';
import LoginSvg from '../../../../components/modals/LoginSvg';
import LoginForm, { forwardRef } from '../../_components/LoginForm';
import Logo from '../../../../components/modals/Logo';
import SocialButton from '../../../../components/modals/SocialButton';
import { useMemo } from 'react';

const Page = () => {
  const logoClassName = useMemo(() => 'max-xl:w-[50%]', []);

  return (
    <div>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Connectez-vous à votre compte" />
      </Head>
      <Box
        id="SignUpRoot"
        className=" bg-[#f0f6f8] flex flex-col overflow-x-hidden md:flex-row w-full"
      >
        {/* left */}

        <Box
          className="bg-white w-full flex flex-col justify-center h-[100vh] gap-8 items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  "
        >
          <Box className="flex flex-col ml-3 gap-5 items-center">
            <Logo className={logoClassName} width={200} height={100} />
            <Box className="text-center text-2 text-4xl max-lg:text-3xl">
              Connectez-vous
            </Box>
          </Box>
          <Box className="flex flex-col gap-5 w-3/5 items-start">
            <Box className="w-full">
              <LoginForm ref={forwardRef} />
            </Box>
            <Box className="flex flex-col gap-3 w-full items-center">
              <Button variant="outlined" className="w-full">
                <SocialButton />
              </Button>

              <Box className="flex">
                <Box className="text-center text-[#727272] max-md:text-sm max-sm:text-xs">
                  Vous n’avez pas un compte?{' '}
                </Box>
