import { prisma } from "../../lib/prisma"

const getOrdersHistoryDB = async ({ userId }:{userId:string}) => {
    const data = await prisma.order.findMany({
        where: {
            customerId:userId
        },
        include: {
            items: {
                
                select: {
                    medicine: {
                        select: {
                            name: true,
                            price:true,
                        }
                    },
                    quantity:true
                },
                
            }
        }
    })
    return data
}
const getOrderByIdDB = async ({ orderId }:{orderId:string}) => {
    const data = await prisma.order.findUnique({
        where: {
            id:orderId
        }
    })
    return data
}
export const ordersService = {getOrdersHistoryDB,getOrderByIdDB}