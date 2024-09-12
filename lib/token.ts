"use server"
export default async function generateToken  () {
return   crypto.randomUUID()
}