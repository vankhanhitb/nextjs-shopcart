"use client";

import { Order } from "@/sanity.types";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";
import toast from "react-hot-toast";

const OrdersComponent = ({ orders }: { orders: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    Order | null
  >(null);
  const handleDelete = () => {
    toast.error("Delete method applied for Admin");
  };
  return (
    <>
      <TooltipProvider>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order?._id || order?.orderNumber}
              className="h-12 cursor-pointer hover:bg-gray-100"
              title="Click to see order details"
              onClick={() => setSelectedOrder(order)}
            >
              <TableCell className="font-medium">
                {order.orderNumber?.slice(-10) ?? "N/A"}...
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order?.orderDate &&
                  format(new Date(order.orderDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {order.email}
              </TableCell>
              <TableCell>
                <PriceFormatter
                  amount={order?.totalPrice}
                  className="text-black font-medium"
                />
              </TableCell>
              <TableCell>
                {order?.status && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order?.status.charAt(0).toUpperCase() +
                      order?.status.slice(1)}
                  </span>
                )}
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                {order?.invoice && (
                  <p className="font-medium line-clamp-1">
                    {order?.invoice ? order?.invoice?.number : "----"}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete();
                    }}
                    className="inline-flex items-center justify-center rounded-sm p-1 group"
                  >
                    <X
                      size={20}
                      className="group-hover:text-shop_dark_green hoverEffect"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete order</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TooltipProvider>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
