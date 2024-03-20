'use server'

import { revalidatePath } from "next/cache";
import { AdminCreateUserParams, CreateUserParams, GetAllUsersParams, UpdateUserParams } from "../../../types"
import { connectToDatabase } from "../mongo";
import User from "../mongo/models/user.model";
import { handleError } from "../utils"
import { clerkClient } from "@clerk/nextjs/server";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error)
  }
}

export const adminCreateUser = async (user: AdminCreateUserParams) => {
  try {
    const res = await clerkClient.users.createUser(user)

    console.log(res);

    if (!res) {
      throw new Error('User creation failed')
    }

  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')

    const res = await clerkClient.users.updateUser(
      clerkId, 
      {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        publicMetadata: { role: user.role, userId: updatedUser._id }
      }
    )

    if (!res) throw new Error('Clerk update failed')

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export const getAllUsers = async ({ query, limit = 6, page, userType }: GetAllUsersParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const usersQuery = User.find(conditions)
      .sort({ lastName: 'asc' })
      .skip(0)
      .limit(limit);

    const users = await usersQuery;
    const usersCount = await User.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(users)),
      totalPages: Math.ceil(usersCount / limit),
    }
  }
  catch (error) {
    handleError(error)
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(user));
  }
  catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Unlink relationships
    // await Promise.all([
      // Update the 'events' collection to remove references to the user
    //  Event.updateMany(
    //    { _id: { $in: userToDelete.events } },
    //    { $pull: { organizer: userToDelete._id } }
    //  ),

      // Update the 'orders' collection to remove references to the user
    //  Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    //])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}