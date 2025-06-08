import { Router } from "express";
import { CreateUser, DeleteUser, getUser, getUsers, UpdateUser } from "@/controllers/UserControllers";
import { CreateRoles, DeleteRoles, getRol, getRoles, UpdateRoles } from "@/controllers/RolesControllers";
import { verifyToken } from "middlewares/Auth";
import { loginUser, registerUser } from "@/controllersAuth/AuthControllers";
import { createPosts, deletePosts, findPosts, findPostsById, updatePosts } from "@/controllersPostControllers";
import { CheckRoles } from "middlewares/Roles";

const router = Router();

export default () => {

    /*Registro Usuarios*/
    router.post("/register", CheckRoles, registerUser);
    
    /*Login Usuarios*/
    router.post("/login", loginUser);
    
    /*Rutas Usuarios*/
    router.get("/mundo", (req, res)=>{
        res.send("Hola mundo. La API está funcionando correctamente");
    });
    
    /*Obtener Usuarios*/
    router.get("/users", getUsers);

    /*Obtener Usuario*/
    router.get("/users/:id", getUser);

    /*Crear Usuario*/
    router.post("/users-add", CreateUser);

    /*Actualizar Usuario*/
    router.put("/users/:id", UpdateUser);

    /*Borrar un Usuario*/
    router.delete("/users/:id", DeleteUser)

    /*Rutas Roles*/

        /*Obtener Rol*/
    router.get("/rol", getRoles);
        /*Obtener Rol*/
    router.get("/rol/:id", getRol);
    
    /*Crear Rol*/
    router.post("/rol-add", CreateRoles);
    
    /*Actualizar Rol*/
    router.put("/rol/:id",UpdateRoles);
    
    /*Borrar un Rol*/
    router.delete("/rol/:id", DeleteRoles);


    /**
     * Rutas para los posts
    */
    router.get("/posts", findPosts);
    router.get("/posts/:id", findPostsById);
    router.post("/posts",  createPosts);
    router.put("/posts/:id", updatePosts);
    router.delete("/posts/:id", deletePosts);

    return router;
}