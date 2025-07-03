"use client";


import { motion } from "framer-motion";
import GoogleButton from "@/components/auth/GoogleButton";
import authLanding from "@/assets/authlanding.jpg";
import Container from "@/components/custom/Container";
import Logo from "@/components/custom/Logo";
import LoginForm from "@/components/auth/login/LoginForm";
import Link from "next/link";
import { ChevronsDown } from "lucide-react";
import  Image  from  'next/image';
export default function LoginPage() {
  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <Container className="flex-1 flex flex-col justify-center items-center ">
        {/* Card */}
        <motion.div
          className="w-full max-w-5xl p-5 bg-white border-2 rounded-lg shadow-xl flex flex-col gap-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex w-full  items-center p-5 justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <p className="italic max-w-50 text-gray-500 text-xs">
                &quot; the product is superfast , reliable and robust with great
                support &quot;
              </p>
              {/* Group Avatar UI */}
              <div className="flex -space-x-4 ">
                <span className="inline-block    w-9 h-9 transition-all duration-200 rounded-full ring-2 ring-white overflow-hidden border border-gray-200 bg-pink-100">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User 1"
                    width={36}
                    height={36}
                    className="w-full  h-full object-cover"
                  />
                </span>
                <span className="inline-block  w-9 h-9 transition-all duration-200 rounded-full ring-2 ring-white overflow-hidden border border-gray-200 bg-gray-100">
                  <Image
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User 2"
                    width={36}
                    height={36}
                    className="w-full  h-full object-cover"
                  />
                </span>
                <span className="inline-block  w-9 h-9 transition-all duration-200 rounded-full ring-2 ring-white overflow-hidden border border-gray-200 bg-yellow-100">
                  <Image
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User 3"
                    width={36}
                    height={36}
                    className="w-full  h-full object-cover"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between  ">
            <div className="flex-1 md:basis-1/2  flex flex-col justify-center p-4 gap-4 min-w-[260px]">
              {/* Title and description inside card */}
              <section className="mb-7 text-start">
                <header className="mb-4">
                  <h1 className="text-2xl font-bold  drop-shadow-sm bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Start now,
                  </h1>
                  <p className="text-base text-neutral-500 font-medium">
                    What are you waiting for!?
                  </p>
                </header>
                <p className="text-gray-500 text-sm leading-tight">
                  Enter your email and password to access your dashboard. If you forgot your password, use the link below to reset it.
                </p>
              </section>
              <LoginForm />
              {/* Divider and Google sign-in */}
              <div className="flex items-center w-full my-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-xs font-medium">
                  OR
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <GoogleButton/>
            </div>
            <div className="flex-1 flex items-center   md:basis-1/2 p-5 relative min-h-[220px] md:min-h-[400px]">
              <Image
                src={authLanding}
                alt="Authentication visual"
                sizes="(min-width: 768px) 66vw, 100vw"
                priority
              />
            </div>
          </div>
          <div className="flex items-center p-5 justify-between text-xs group">
            <p className="text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
            </p>
            <Link
              className="border-1 text-xs text-sky-500 flex items-center gap-2 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all duration-200 cursor-pointer rounded-lg bg-sky-500/10 px-2 py-1 group"
              href="/auth/register"
            >
              Sign up
              <ChevronsDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-270" />
            </Link>
          </div>
        </motion.div>
      </Container>
      <footer className="flex border-t-1 items-center p-2 w-full text-center align-center justify-center">
        <p className="text-xs text-gray-500">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </footer>
    </section>
  );
}