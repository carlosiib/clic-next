'use client'
import { Button } from "u@/components/ui/buttonndefined";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "u@/components/ui/formndefined";
import { Input } from "u@/components/ui/inputndefined";
import { Search as SearchIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().min(1, { message: "Field is required." }).email({ message: "Invalid email address" })
})

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      // const form = Object.fromEntries(new FormData(e.currentTarget))

      // const data = formSchema.parse(form)
      // console.log(data)

      router.push(pathname + '?' + createQueryString('email', values.email))


    } catch (error) {
      if (error instanceof z.ZodError) {
        return console.log("zod error", error.issues[0].message)
      }
      if (error instanceof Error) {
        return console.log("Error", error.message)
      }
      console.log("Error general", error)
    }
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="search__form md:flex md:gap-2 md:items-end">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3 md:mb-0 md:basis-80" >
              <FormLabel className="text-xl">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <SearchIcon className="text-gray-600 w-[20px] absolute top-[18%] left-2" />
                  <Input placeholder="customer@email.com" type="email" className="pl-9" {...field} />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full md:w-fit" type="submit" >Submit</Button>
      </form>

    </Form>
  )
}