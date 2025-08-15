import { apiInstance } from "@/shared/api/apiInstance";
import { User } from "../model/types";

export const createUserApi = async (user: User) =>
{
    apiInstance.post('/users', user)
}