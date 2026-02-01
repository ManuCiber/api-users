import { Router } from "express";
import { CreateUser, DeleteUser, getUser, getUsers, UpdateUser } from "@/controllers/UserControllers";
import { CreateRoles, DeleteRoles, getRol, getRoles, UpdateRoles } from "@/controllers/RolesControllers";
import { getPermisos, verifyToken } from "middlewares/Auth";
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
    router.get("/users", verifyToken, getUsers);

    /*Obtener Usuario*/
    router.get("/users/:id", verifyToken, getUser);

    /*Crear Usuario*/
    router.post("/users-add", verifyToken, CreateUser);

    /*Actualizar Usuario*/
    router.put("/users/:id", verifyToken, UpdateUser);

    /*Borrar un Usuario*/
    router.delete("/users/:id", verifyToken, DeleteUser);

    /*Rutas Roles*/
        /*Obtener Rol*/
    router.get("/rol", verifyToken, getRoles);
    /*Obtener Rol*/
    router.get("/rol/:id", verifyToken, getRol);
    /*Crear Rol*/
    router.post("/rol-add", verifyToken, CreateRoles);
    /*Actualizar Rol*/
    router.put("/rol/:id", verifyToken, UpdateRoles);

    /*Borrar un Rol*/
    router.delete("/rol/:id", verifyToken, DeleteRoles);

    /**
     * Rutas para los posts
     */
    router.get("/posts", findPosts);
    router.get("/posts/:id", findPostsById);
    router.post("/posts", verifyToken, getPermisos ,createPosts);
    router.put("/posts/:id", verifyToken, updatePosts);
    router.delete("/posts/:id", verifyToken, deletePosts);

    return router;
}