"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Style used for active/highlighted dropdown items
const selectItemActive =
  "cursor-pointer transition-colors hover:bg-blue-400 hover:text-white data-[highlighted]:bg-blue-400 data-[highlighted]:text-white focus:bg-blue-400 focus:text-white data-[state=checked]:bg-transparent data-[state=checked]:text-gray-900";

// ----- Schema (trim + strict enum) -----
const RoleEnum = z.enum(["Administrator", "Instructor", "Student"]);
const loginSchema = z.object({
  role: RoleEnum,
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: { role: "Administrator", email: "", password: "" }, // stable defaults
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
    // TODO: call your auth API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/rad5-logo.png"
            alt="RAD5 Academy Logo"
            width={100}
            height={100}
            className="mx-auto mb-2"
            priority
          />
          <h1 className="text-2xl font-bold text-gray-900">RAD5 Academy</h1>
          <p className="text-sm text-gray-600">Learning Management System</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to access the LMS</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role (controlled Select) */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value ?? "Administrator"} onValueChange={field.onChange}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator" className={selectItemActive}>Administrator</SelectItem>
                    <SelectItem value="Instructor" className={selectItemActive}>Instructor</SelectItem>
                    <SelectItem value="Student" className={selectItemActive}>Student</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
