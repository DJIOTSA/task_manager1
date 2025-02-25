import { baseUrl } from "../api";
import { editTaskPayload } from "../types/tasks";
import { Task } from '../types/tasks';
import { currentToken } from './auth';

export async function getTasks() {
    try {
        const token = currentToken();

        const res = await fetch(`${baseUrl}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
         
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            return Promise.reject(data)
        }
  
        return data as Task[];
  
      } catch (err) {
        console.log("getTasks ERROR", err)
        return Promise.reject(err)
      }
}

// export async function editTask(editTask: editTaskPayload) {
//     try {
//         const token = currentToken();

//         const res = await fetch(`${baseUrl}/tasks/${editTask.id}}`, {
//           headers: {
//             "method": "PUT",
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//             body: JSON.stringify(editTask.title)
//           },
         
//         });
        
//         const data = await res.json();
        
//         if (!res.ok) {
//             return Promise.reject(data)
//         }
  
//         return data as Task;
  
//       } catch (err) {
//         console.log("getTasks ERROR", err)
//         return Promise.reject(err)
//       }
// }


export async function createTask(payload: editTaskPayload) {
  try {
    const token = currentToken();
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return Promise.reject(data);
    }

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}


export async function updateTask(id: string, payload: editTaskPayload) {
  try {
    const token = currentToken();
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return Promise.reject(data);
    }

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}