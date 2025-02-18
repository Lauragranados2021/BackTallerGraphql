const oficina=require("../models/oficina")
const alquiler=require("../models/alquiler")
const {format}=require("date-fns");


const resolvers={
Query:{
    getOficinas:async()=>{
        const data= await oficina.find({}).populate("alquiler");
        return data
    },
    getOficina:async(_,args)=>{
        try{
            const id=args.id
            const data=await oficina.findOne({id:id}).populate("alquiler");
            return data
        }
        catch(err){
            console.log(err)
        }
    },
    getAlquilers:async()=>{
        try{
        const data=await alquiler.find({})
        const formattedcontract = data.map(reservation => ({
            id: reservation.id,
            ContractStartDate: format(new Date(reservation.ContractStartDate), 'yyyy-MM-dd'),
            ContractEndDate: format(new Date(reservation.ContractEndDate), 'yyyy-MM-dd'),
            price: reservation.price,
            oficinaID: reservation.oficinaID,
          }));
          return formattedcontract;

        }
        catch(err){
            console.log(err)
        }
    },
    getAlquiler:async(_,args)=>{
        try{
            const id=args.id
            const reservation=await alquiler.findOne({id:id})
            const formattedcontract = {
                id: reservation.id,
                ContractStartDate: format(new Date(reservation.ContractStartDate), 'yyyy-MM-dd'),
                ContractEndDate: format(new Date(reservation.ContractEndDate), 'yyyy-MM-dd'),
                price: reservation.price,
                oficinaID: reservation.oficinaID,
              };
              return formattedcontract;
            

        }catch(err){
            console.log(err)
        }
    }

},
Mutation:{
    createOficina:async(_,args)=>{
        try{
            const {id,name,direccion,capacidad}=args
            const data=new oficina({id,name,direccion,capacidad})
            await data.save()
            return data
        }catch(err){
            console.log(err)
        }
    },
    createAlquiler:async(_,args)=>{
        try{
            const {id,ContractStartDate,ContractEndDate,price,IDoficina}=args
            
            const alquiOfi=await oficina.findOne({id:IDoficina})
            if(!alquiOfi){
                throw new Error("Oficina no existe")
            }
            const ofici=alquiOfi._id
            const data= new alquiler({id,ContractStartDate,ContractEndDate,price})
            await data.save()
            alquiOfi.alquiler.push(data)
            await alquiOfi.save()
            return data

        }catch(err){
            console.log(err)
        }
    },
    deleteOficina:async(_,args)=>{
        try{
            const data=await  oficina.findOne({id:args.id})

            if(!data){
                throw new Error("Oficina no existe")
            }
            if(data.alquiler.length>0){
                throw new Error("No se puede eliminar oficina con alquiler")
            }
            await data.deleteOne(data._id)
            return data

        }catch(err){
            console.log(err)
        }
    },
    deleteAlquiler:async(_,args)=>{
        try{
            const id=args.id
            const data=await alquiler.findOne({id:id})
            
            if(!data){
                throw new Error("Alquiler no existe")
            }
            const ofic = await oficina.findOne({ "alquiler": data._id });
    console.log("Oficina encontrada: " + ofic);
    if (!ofic) {
        throw new Error("Oficina con este alquiler no encontrada");
    }
            ofic.alquiler.pull(data._id)
            await ofic.save()
            await data.deleteOne(data._id)
            return data

        }catch(err){
            console.log(err)
        }
    },
    updateOficina:async(_,args)=>{
        try{
            const {id,name,direccion,capacidad}=args
            const data=await oficina.findOne({id:id}).populate("alquiler");
            if(!data){
                throw new Error("Oficina no existe")
            }
            
            data.name=name
            data.direccion=direccion
            data.capacidad=capacidad
            await data.save()
            return data

           
        }catch(err){
            console.log(err)
        }
    },
    updateAlquiler:async(_,args)=>{
        try{
            const {id,ContractStartDate,ContractEndDate,price,IDoficina}=args
            const data=await alquiler.findOne({id:id})
            console.log(data)
            if(!data){
                throw new Error("Alquiler no existe")
            }
            const ofic = await oficina.findOne({ "alquiler": data._id });
    console.log("Oficina encontrada: " + ofic);
   
    
            ofic.alquiler.pull(data._id)
            await ofic.save()
            console.log(IDoficina)
            const ofinw=await oficina.findOne({id:IDoficina})
            console.log(ofinw)
            if(!ofinw){
                throw new Error("Oficina no existe")
            }
            
          
            data.ContractStartDate=ContractStartDate
            data.ContractEndDate=ContractEndDate
            data.price=price
            ofinw.alquiler.push(data._id)
            await ofinw.save()
            await data.save()
            return data
        }catch(err){
            console.log(err)
        }
    }
    
}
}




module.exports={resolvers};