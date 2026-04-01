import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { uploadResume } from "@/apis/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/upload/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = Boolean(token);
  const [file, setFile] = useState<File | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const nextFile = event.target.files?.[0] || null;
    setFile(nextFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF or DOCX file.");
      return;
    }

    if (!isLoggedIn) {
      setError("Please log in before uploading your resume.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadResume(file, token, aiEnabled);
      const data = response?.data ?? response;
      toast.success("Resume uploaded successfully!");
      if (data?.aiEnhanced) {
        toast.info("AI analysis is enabled for this upload.");
      } else {
        toast.info("Standard analysis will be used.");
      }
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Upload failed. Please retry.";
      setError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold">Resume Upload</h1>
          <p className="text-sm text-slate-500 mt-2">
            Upload a PDF or DOCX resume to generate your analysis dashboard.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Resume File</label>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />
            {file && (
              <p className="text-xs text-slate-500 mt-2">Selected: {file.name}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">AI Insights</p>
              <p className="text-xs text-slate-500">Toggle AI-assisted suggestions.</p>
            </div>
            <label className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{aiEnabled ? "ON" : "OFF"}</span>
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={() => setAiEnabled((prev) => !prev)}
                className="h-4 w-4"
              />
            </label>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-md p-3">
              {error}
            </div>
          )}

          <Button onClick={handleUpload} disabled={isUploading} className="w-full">
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>
      </div>
    </div>
  );
}
