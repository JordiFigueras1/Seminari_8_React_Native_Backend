import { usersofDB } from '../modelos/types_d_users';

export const getEntries = {
    getAll: async () => {
        return await usersofDB.find();
    },
    findById: async (id: string) => {
        return await usersofDB.findById(id).populate('experiencies');
    },
    findByNameOrEmail: async (query: string) => {
        return await usersofDB.find({
            $or: [{ name: { $regex: query, $options: 'i' } }, { mail: { $regex: query, $options: 'i' } }],
        }).populate('experiencies'); // Incluye las experiencias relacionadas
    },
    addExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $addToSet: { experiencies: idExp } });
    },
    delExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(
            idUser,
            { $pull: { experiencies: idExp } }, // Usamos $pull para eliminar solo la experiencia
            { new: true } // Opción para devolver el documento actualizado
        );
    },
    create: async (entry: object) => {
        return await usersofDB.create(entry);
    },
    update: async (id: string, body: object) => {
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id, body, { $new: true });
    },
    searchByNameOrMail: async (query: string) => {
        return await usersofDB.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Busca por nombre (insensible a mayúsculas)
                { mail: { $regex: query, $options: "i" } }, // Busca por correo (insensible a mayúsculas)
            ],
        });
    },
    
    delete: async (id: string) => {
        return await usersofDB.findByIdAndDelete(id);
    }
};
