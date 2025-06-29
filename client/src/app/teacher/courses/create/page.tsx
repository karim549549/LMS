"use client"
import React, { useState } from "react";
import Step1CourseInfo from '@/components/teacher/courses/create/Step1CourseInfo'
import Step2Lessons from '@/components/teacher/courses/create/Step2Lessons'
import Step3Quizzes from '@/components/teacher/courses/create/Step3Quizzes'
import Step4Assignments from '@/components/teacher/courses/create/Step4Assignments'
import Step5Settings from '@/components/teacher/courses/create/Step5Settings'
import CoursePreview from '@/components/teacher/courses/create/CoursePreview'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, BookOpen, FileText, Settings, Plus, FileCheck } from 'lucide-react'

export default function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // You will need to collect data from Zustand store here
    // and validate as needed
    setSubmitted(true)
    setValidationErrors([])
  }

  // Remove StepComponent and prop passing, use switch for step rendering
  let StepContent: React.ReactNode
  switch (currentStep) {
    case 0:
      StepContent = <Step1CourseInfo />
      break
    case 1:
      StepContent = <Step2Lessons />
      break
    case 2:
      StepContent = <Step3Quizzes />
      break
    case 3:
      StepContent = <Step4Assignments />
      break
    case 4:
      StepContent = <Step5Settings />
      break
    default:
      StepContent = null
  }

  return (
    <main className="w-full py-8 flex flex-col items-center min-h-screen bg-gradient-to-br from-[#f7fafc] via-[#e3e9f7] to-[#f8f6ff] font-sans">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Wizard */}
        <div className="flex-1 min-w-0">
          {/* Custom Stepper */}
          <div className="mb-8 flex items-center gap-2">
            {[0,1,2,3,4].map((idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => handleStepChange(idx)}
                  className={cn(
                    "rounded-full w-12 h-12 flex items-center justify-center font-bold border-4 transition-all duration-200 shadow-sm",
                    idx === currentStep
                      ? "bg-gradient-to-br from-primary to-blue-500 text-white border-blue-400 scale-110 shadow-lg"
                      : "bg-white text-gray-400 border-gray-200 hover:bg-blue-50 hover:text-blue-600"
                  )}
                  style={{ zIndex: 2 }}
                >
                  {idx === 0 && <BookOpen className="w-6 h-6" />}
                  {idx === 1 && <Plus className="w-6 h-6" />}
                  {idx === 2 && <FileCheck className="w-6 h-6" />}
                  {idx === 3 && <FileText className="w-6 h-6" />}
                  {idx === 4 && <Settings className="w-6 h-6" />}
                </button>
                {idx < 4 && (
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full" style={{ zIndex: 1 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Labels */}
          <div className="mb-6 flex justify-between items-center px-2">
            {[0,1,2,3,4].map((idx) => (
              <div key={idx} className="flex flex-col items-center w-1/5">
                <span
                  className={cn(
                    "text-xs font-semibold tracking-wide uppercase transition-colors",
                    idx === currentStep ? "text-blue-700" : "text-gray-400"
                  )}
                >
                  {idx === 0 && 'Course Info'}
                  {idx === 1 && 'Lessons'}
                  {idx === 2 && 'Quizzes'}
                  {idx === 3 && 'Assignments'}
                  {idx === 4 && 'Settings'}
                </span>
                {idx === currentStep && <div className="mt-1 w-6 h-1 rounded-full bg-blue-500" />}
              </div>
            ))}
          </div>

          {!submitted ? (
            <>
              {StepContent}
              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <Button 
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 rounded-full border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 shadow-sm px-6 py-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentStep === 4 ? (
                    <Button 
                      onClick={handleSubmit}
                      className="min-w-[120px] rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:from-blue-600 hover:to-blue-800 px-8 py-2"
                    >
                      Create Course
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      className="flex items-center gap-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 px-8 py-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Card className="mt-6 border-red-200 bg-gradient-to-br from-red-50 to-white shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Please fix the following errors:
                    </h3>
                    <ul className="space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">
                          • {error}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-8 flex flex-col items-center bg-gradient-to-br from-green-50 to-white shadow-lg border-green-200">
              <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-bounce" />
                Course Ready for Submission!
              </h2>
              <p className="mb-6 text-gray-600">Review your course details in the preview. You can now submit or go back to edit.</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => alert('Submit to backend here!')}
                  className="min-w-[120px] rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md hover:from-green-600 hover:to-green-800 px-8 py-2"
                >
                  Submit Course
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border-2 border-green-200 bg-white text-green-700 hover:bg-green-50 shadow-sm px-6 py-2"
                >
                  Edit Course
                </Button>
              </div>
            </Card>
          )}
        </div>
        {/* Live Preview */}
        <div className="w-full md:w-96">
          <CoursePreview />
        </div>
      </div>
    </main>
  )
}
