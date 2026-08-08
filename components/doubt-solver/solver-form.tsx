"use client";

import { useState, useRef } from "react";

interface SolverFormProps {
  onSubmit: (question: string, image: File | null) => void;
  loading: boolean;
  error: string | null;
}

export default function DoubSolverForm({
  onSubmit,
  loading,
  error,
}: SolverFormProps) {
  const [question, setQuestion] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() && !selectedImage) {
      alert("Please enter a question or upload an image");
      return;
    }

    onSubmit(question, selectedImage);
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <p className="text-red-700 font-semibold">Error: {error}</p>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-background border-2 border-primary/30 rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-lg font-semibold text-foreground mb-3">
              Enter Your Question or Doubt
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your doubt here... (e.g., How do I solve this integral? What's the concept behind...)"
              className="w-full px-4 py-3 border-2 border-secondary/30 rounded-lg bg-background text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none resize-none"
              rows={6}
              disabled={loading}
            />
            <p className="text-xs text-foreground/60 mt-2">
              Be specific and provide context for better solutions
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-semibold text-foreground mb-3">
              Upload Image (Optional)
            </label>
            <div className="border-2 border-dashed border-secondary/40 rounded-lg p-8 text-center">
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Problem image"
                    className="max-h-48 mx-auto rounded-lg object-cover"
                  />
                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition-colors"
                    >
                      Remove
                    </button>
                    <label className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold cursor-pointer hover:shadow-md transition-all">
                      Change
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={loading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="text-4xl mb-3">📸</div>
                  <p className="text-foreground font-semibold mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-foreground/60">
                    PNG, JPG or GIF (max. 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (!question.trim() && !selectedImage)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Solving your doubt...
              </span>
            ) : (
              "Get Solution"
            )}
          </button>
        </form>
      </div>

      {/* Tips Card */}
      <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-6">
        <h4 className="font-bold text-accent mb-3">Tips for best results:</h4>
        <ul className="text-sm text-foreground/70 space-y-2">
          <li>✓ Be specific about what you&apos;re confused about</li>
          <li>✓ Upload clear, well-lit images for handwritten problems</li>
          <li>✓ Include relevant formulas or given information</li>
          <li>✓ Mention which chapter or topic the question is from</li>
        </ul>
      </div>
    </div>
  );
}
