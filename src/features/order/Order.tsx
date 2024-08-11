// Test ID: IIDSAT

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

export type OrderTYPE = {
  id?: string;
  status?: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: [
    {
      pizzaId: number;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    },
  ];
  position: string;
  orderPrice: number;
  priorityPrice: number;
};

function Order() {
  const order = useLoaderData() as OrderTYPE;
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between  gap-2 flex-wrap">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full py-1 px-3 text-sm font-semibold uppercase text-red-50 tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm font-semibold uppercase text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap item-center justify-between gap-2 bg-stone-200 py-5 px-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y dive-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

/* eslint-disable */
export async function loader({ params }: LoaderFunctionArgs): Promise<void> {
  if (!params.orderId) return;

  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
