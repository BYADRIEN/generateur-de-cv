"use client"

import { createAuthClient } from "better-auth/react"
import React, { useState } from "react"

export const authClient = createAuthClient({})

export default function AuthClient() {
    type FormType = "Sign Up" | "Sign In" | "Sign Out"

    const [showForm, setShownForm] = useState<FormType>("Sign Up")
    const [justSigneUp, setJustSigneUp] = useState(false)
    const { data: session, isPending } = authClient.useSession()

    async function sendSignupReq(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email") as string
        const name = formData.get("name") as string
        const password = formData.get("password") as string

        const { data, error } = await authClient.signUp.email(
            {
                email,
                name,
                password,
            },
            {
                onSuccess: () => {
                    setJustSigneUp(true)

                    setTimeout(() => {
                        setJustSigneUp(false)
                    }, 2000)
                },
            }
        )

        if (error) {
            console.error("Erreur inscription :", error)
            alert(error.message)
            return
        }

        console.log("Utilisateur créé :", data)
        alert("Compte créé avec succès !")
    }

    async function sendSigninReq(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        })

        if (error) {
            console.error("Erreur connexion :", error)
            alert(error.message)
            return
        }

        console.log("Utilisateur connecté :", data)
    }

    function drawButton(label: FormType) {
        return (
            <button
                type="button"
                className={`${
                    showForm === label
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                } px-5 py-2 rounded-lg font-bold`}
                onClick={() => setShownForm(label)}
            >
                {label}
            </button>
        )
    }

    return (
        <div>
            <h1 className="text-3xl">Hello { session ? session.user.email : 'Guest' }</h1>

            <div className="flex justify-around w-full max-w-md mb-8">
                {drawButton("Sign Up")}
                {drawButton("Sign In")}
                {drawButton("Sign Out")}
            </div>

            {showForm === "Sign Up" && (
                <>
                    <h2 className="text-2xl">Sign up form</h2>

                    <form
                        className="flex flex-col gap-4 w-full max-w-md"
                        onSubmit={sendSignupReq}
                    >
                        <label htmlFor="signup-email">Email:</label>

                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <label htmlFor="name">Name:</label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <label htmlFor="signup-password">
                            Password:
                        </label>

                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-gray-600 text-white px-5 py-2 rounded-lg font-bold"
                        >
                            Sign Up
                        </button>
                    </form>
                </>
            )}

            {showForm === "Sign In" && (
                <>
                    <h2 className="text-2xl">Sign in</h2>

                    <form
                        className="flex flex-col gap-4 w-full max-w-md"
                        onSubmit={sendSigninReq}
                    >
                        <label htmlFor="signin-email">Email:</label>

                        <input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <label htmlFor="signin-password">
                            Password:
                        </label>

                        <input
                            id="signin-password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-gray-600 text-white px-5 py-2 rounded-lg font-bold"
                        >
                            Sign In
                        </button>
                    </form>
                </>
            )}
            { showForm === 'Sign Out' && <>
                <h2>Log out form</h2>
                <button type="submit" className="bg-gray-600 text-white px-5 py-2 rounded-lg font-bold" onClick={() =>{
                        authClient.signOut()
                }}>Sign out</button>
            </>}
            {justSigneUp && <p>Success sign up !</p>}
        </div>
    )
}