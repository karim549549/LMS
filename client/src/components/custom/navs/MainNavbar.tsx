"use client";
import Container from '../Container';
import Logo from '../Logo';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';
import SearchDialog from './SearchDialog';
import UserActions from './UserActions';

const categories = [
  {
    name: "Courses",
    sub: ["My Courses", "Browse Courses", "Course Progress", "Continue Learning"]
  },
  {
    name: "Assignments",
    sub: ["My Assignments", "Due Soon", "Submitted", "Graded"]
  },
  {
    name: "Quizzes",
    sub: ["Available Quizzes", "My Results", "Practice Tests", "Quiz History"]
  },
  {
    name: "Progress",
    sub: ["Overall Progress", "Course Completion", "Performance Stats", "Achievements"]
  },
];

export default function MainNavbar() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header>
      {/* Full Navbar (only at top) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-30 bg-white  shadow"
          >
            <div className='bg-sky-100 p-4'>
              <Container className="text-center items-center flex">
                <span className="md:text-base text-xs  text-gray-800 flex items-center justify-center w-full">
                  &quot;Live as if you were to die tomorrow.&quot;
                  <span className="mx-3 h-5 w-px bg-blue-300 inline-block align-middle"></span>
                  <span className="underline text-neutral-700 font-semibold">Learn as if you were to live forever.</span>
                </span>
              </Container>
            </div>
            <div className='bg-white p-2 w-full'>
              <Container className='flex justify-between w-full items-center gap-5'>
                <Logo/>
                <div className='hidden  lg:inline'>
                  <MegaMenu active={activeCategory} setActive={setActiveCategory} />
                </div>
                <div className='hidden md:inline'>
                  <SearchDialog/>
                </div>
                <UserActions/>
              </Container>
            </div>
            {/* Subcategory bar, only at top, as part of main content */}
            <div className="bg-black p-2 lg:block hidden">
              <div className="flex justify-center gap-5 items-center px-4 py-2 text-xs">
                {categories[activeCategory].sub.map((sub) => (
                  <span key={sub} className="font-medium whitespace-nowrap cursor-pointer text-white hover:underline px-2 rounded transition-all">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Bar (sticky, only when scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed flex items-center justify-center top-0 left-0 right-0 z-40 bg-tranparent  shadow-md   px-6 py-2"
          >
            <div className='flex items-center  max-w-5xl w-full backdrop-blur-md justify-between bg-black/70 relative p-2 rounded-lg'>
              <div className='bg-cyan-500/40 absolute  top-50% left-[30%] w-80 h-full blur-md  -z-1 ' />
              <Logo/>
              <div className='hidden  md:block'>
                <SearchDialog/>
              </div>
              <UserActions theme='dark'/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}