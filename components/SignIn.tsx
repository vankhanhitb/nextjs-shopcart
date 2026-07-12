import { SignInButton } from '@clerk/nextjs';
import React from 'react'
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <SignInButton mode="modal">
      <Button className="text-sm font-semibold hover:text-dark text-light hover:cursor-pointer hoverEffect">
        SignIn
      </Button>
    </SignInButton>
  )
}
