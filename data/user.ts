'use server'
import { db } from '@/lib/db'

export type User = {
  id: string
  email: string
}

export type Establishment = {
  id: string
}

export type Class = {
  id: string
  name: string
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
    },
  })
  return user
}

export const getUserEstablishmentByUserId = async (id: string): Promise<Establishment[]> => {
  try {
    const userEstablishments = await db.establishment.findMany({
      where: {
        user_establishment: {
          some: {
            id,
          },
        },
      },
    })
    return userEstablishments
  } catch (error) {
    console.error('Error getting UserEstablishment:', error)
    throw error
  }
}

export const getClassesOfUser = async (userId: string): Promise<Class[]> => {
  const data = await db.classe.findMany({
    where: {
      student_class: {
       
