import { Badge } from "u@/components/ui/badgendefined";
import { Table as TableContainer, TableBody, TableCell, TableHead, TableHeader, TableRow } from "u@/components/ui/tablendefined";

interface TableCompProps {
  customers: {
    shopifyId: number,
    firstName: string | null;
    lastName: string | null,
    IsPWActivated: boolean,
    email: string
  }[],
  title: string | undefined,
  searchFor: string | undefined,
}

export default async function Table({ customers, title, searchFor }: TableCompProps) {

  return (
    <>
      {customers.length === 0 && searchFor &&
        <>
          <h4 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl pt-4 text-center">No data available for customer</h4>
          <p className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg text-center text-gray-700">{searchFor}</p>
        </>
      }
      {customers.length !== 0 && (
        <>
          {title && <h2 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl py-4">{title}</h2>}
          <TableContainer>
            <TableHeader>
              <TableRow>
                <TableHead className=" px-0">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(customer => <>
                <TableRow key={customer.shopifyId}>
                  <TableCell className="font-medium px-0">{(customer?.firstName ?? '') + (customer?.lastName ?? '')}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.IsPWActivated ?
                      <Badge className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm shadow-none dark:bg-green-900 dark:text-green-300 hover:bg-green-100 hover:text-green-800 ">
                        Enabled
                      </Badge>
                      :
                      <Badge className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm shadow-none dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-800 ">
                        Pending
                      </Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <button>...</button>
                  </TableCell>
                </TableRow>
              </>)}
            </TableBody>
          </TableContainer >
        </>
      )
      }
    </>

  )
}