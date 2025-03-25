"use client"

import { useState } from "react"
import { Download, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ResumePage() {
    const [isPreviewVisible, setIsPreviewVisible] = useState(true)

    const togglePreview = () => {
        setIsPreviewVisible(!isPreviewVisible)
    }

    return (
        <div className="container mx-auto px-4 py-12 mt-12 max-w-5xl">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">My Resume</h1>
                    <p className="text-muted-foreground">View and download my professional resume below</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Button asChild className="w-full sm:w-auto">
                        <a href="/resume.pdf" download>
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                        </a>
                    </Button>

                    <Button variant="outline" onClick={togglePreview} className="w-full sm:w-auto">
                        {isPreviewVisible ? (
                            <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Hide Preview
                            </>
                        ) : (
                            <>
                                <Eye className="mr-2 h-4 w-4" />
                                Show Preview
                            </>
                        )}
                    </Button>
                </div>

                {isPreviewVisible && (
                    <Card className="overflow-hidden border rounded-lg shadow-sm">
                        <div className="aspect-[8.5/11] w-full max-h-[800px]">
                            <iframe src="/resume.pdf" className="w-full h-full border-0" title="Resume Preview" />
                        </div>
                    </Card>
                )}

                <div className="text-sm text-muted-foreground">
                    <p>
                        This resume was last updated on {`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}. For any questions or to request
                        additional information, please contact me through <a href="mailto:milindgupta578@gmail.com" className="text-blue-500 underline">milindgupta578@gmail.com</a> or <a href="https://www.linkedin.com/in/milindguptaji/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LinkedIn</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

