"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddProductForm, addProductFormSchema } from "@/zod/custom";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/data/navbar";

export function AddProduct() {
  const form = useForm<TAddProductForm>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      category: "Appliance",
      images: [],
      description: "",
      price: 0,
    },
  });

  const onSuccess = async () => {};

  const { mutate, isPending } = api.seller.addProduct.useMutation({
    onSuccess,
  });

  const onSubmit = (values: TAddProductForm) => {
    // mutate(values);
    // TODO: Complete onSubmit
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline" className="space-x-2 h-8">
          <PlusCircledIcon className="size-4" />
          <span>Add item</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container">
        <div>
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-2xl">Create a new product</DrawerTitle>
            <DrawerDescription>
              Fill the form below and click submit
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <Textarea
                      className="min-h-[8rem] lg:min-h-[15rem]"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="flex gap-2 px-0">
                <Button type="submit" className="w-fit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
