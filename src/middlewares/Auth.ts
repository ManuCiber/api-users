import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "repositories/UserRepository";
import { UserService } from "services/UserService";
import { Method, permissions } from "types/PermissionsTypes";
import { IUserRepository, IUSerService, User} from "types/UsersTypes";



const userRepository: IUserRepository = new UserRepository();
const userService: IUSerService = new UserService(userRepository);


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.replace(/^Bearer\s+/, "") as string;
    console.log(token);
    
    try {

      //if(!token) res.status(401).json({message:"Token no Proporcionado"});

      const verify = jwt.verify(token, jwtSecret) as User;
  
      const getUser = await userService.findUsersById(verify.id);
      if (!getUser) return res.status(400);
      
      req.currentUser = getUser;
      next();
      
    } catch (error: any) {
      console.log("error :>> ", error);
      res.status(401).send(error.message);
    }
  };


  export const getPermisos = async(req: Request, res: Response, next: NextFunction) =>{
      /*Obtener los roles desde currentUser
      * Obtener el método HTTP de la petición
      */

      const {currentUser, method, path} = req;
      const {roles} = currentUser;
      console.log(currentUser) // -> Para ver lo que hay en currentUser
      
      //Obteber el path de cada modulo:

      const currentModule = path.replace("/^\/([^/]+).*/","$1");
      console.log(currentModule) // -> Para saber lo que ocurre en el path de modulos

      /**
       * Lógica para conseguir la coincicencias para obtener el objeto con el método.
      */
    
      const findMetodo = permissions.find(x=> x.method === Method[method as keyof typeof Method]);

      /*Acá de armará el permiso correspondiente al scope en el momento de la petición*/

      if(!findMetodo?.permissions.includes(`${currentModule}_${findMetodo.scope}`)){
        findMetodo?.permissions.push(`${currentModule}_${findMetodo.scope}`);
      }
      console.log(findMetodo) // -> Acá los métodos en la consola.´

      /**
       * Se van a obtener los permisos de los usuarios:
      */

      const mergedRolesPermissions = [...new Set(roles?.flatMap(x=> x.permissions))];

      console.log(mergedRolesPermissions); // -> para ver todos los roles.

      /**
       * Acá se verificará el usuario que tenga permisos... Nota: Estos tienen mayor prioridad que los permisos de los roles
      */

      let userPermissions: string[] = [];

      if(currentUser.permissions?.length !==0){
        userPermissions = currentUser.permissions!;
      } else {
        userPermissions = mergedRolesPermissions;
      }


      /**
       * Se comparará si los permisos armados en el scope con los permisos de los roles de usuarios
      */

      const permissionsGranted = findMetodo?.permissions.find(x=>userPermissions.includes(x));

      console.log(permissionsGranted); // -> Mostramos el tema de los permisos obtenidos

      /**
       * Si en caso no hay un match con los permisos, retornamos un error unauthorized (No autorizado)
      */

      if(!permissionsGranted) return res.status(401).send("No autorizado !");
      next();
  } 