"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React from "react";
import { Card } from "../card";
import { Download } from "lucide-react";
import { Button } from "../button";

const ResearchReport = () => {
  const { report, isCompleted, isLoading, topic } = useDeepResearchStore();

  const handleDownload = () => {
    // Extract content between report tags
    const content = report.split("<report>")[1].split("</report>")[0];

    // Create a complete HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${topic} - Research Report</title>
          ${content.includes("<style>") ? "" : `
          <style>
            body { font-family: 'Calibri', sans-serif; line-height: 1.5; padding: 20px; }
            h1 { color: #2F5496; font-size: 24pt; margin-top: 24pt; }
            h2 { color: #2F5496; font-size: 18pt; margin-top: 18pt; }
            h3 { color: #1F3864; font-size: 14pt; margin-top: 14pt; }
            p { margin: 12pt 0; }
            ul { margin: 12pt 0; }
            li { margin: 6pt 0; }
            pre { background-color: #F8F8F8; padding: 12pt; margin: 12pt 0; white-space: pre-wrap; }
            code { font-family: 'Consolas', monospace; }
            blockquote { margin: 12pt 24pt; padding-left: 12pt; border-left: 4px solid #DDD; }
          </style>
          `}
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    // Create and trigger download
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}-research-report.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isCompleted) return null;

  if (report.length <= 0 && isLoading) {
    return (
      <Card className="p-4 max-w-[50vw] bg-white/60 border px-4 py-2 rounded-xl">
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">
            Researching your topic...
          </p>
        </div>
      </Card>
    );
  }

  if (report.length <= 0) return null;

  // Extract content between report tags
  const content = report.split("<report>")[1].split("</report>")[0];

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>
      <Card className="p-8 bg-white/60 backdrop-blur-sm prose prose-slate max-w-none">
        <div
          className="report-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card>
    </div>
  );
};

export default ResearchReport;
