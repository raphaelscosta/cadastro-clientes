
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import api from './services/api'
import { useEffect, useState } from "react";
import { HiOutlineArrowRight} from "react-icons/hi";
import { Button } from "flowbite-react";
import ClientModal from "./services/Form";
import logo from "./assets/lista-clientes.png"



export function App() {
  
  const [clients, setClients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  

  useEffect(() => {
    try{
      api.get('/clientes').then(response => setClients(response.data))
    }catch(e){
      console.error(e)
    }
  }, [])

  
 
  async function handleDeleteClient(id){
    try{
      const response = await api.delete(`/clientes/${id}`);
      const user = await response.data;
      console.log("Usuario deletado" + user );
      setClients(clients.filter(client => client.id !== id));

    }
    catch(e){
      console.error(e);
    }
  }
  return (
    <>
      <div className="flex w-full justify-between">
        <img src={logo} className="items-center justify-center h-25 w-33" />
        <Button className="h-12 m-3 mt-6" onClick={() => {setOpenModal(true); setText('Adicionar'); setId('')}}>
          Adicionar Cliente
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {openModal && <ClientModal onClose={() => setOpenModal(false)} text={text} clients={clients} setClients={setClients} id={id}/>}


      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Nome</TableHeadCell>
              <TableHeadCell>Sobrenome</TableHeadCell>
              <TableHeadCell>Telefone</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {clients && clients.map(client => 
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={client.id}> 
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {client.name}
                </TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.telephone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <a className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => {setOpenModal(true); setText('Editar'); setId(client.id)}} >
                    Edit
                  </a>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDeleteClient(client.id)} className="flex justify-center items-center font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <svg class="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>

                  </button>
                </TableCell>
            </TableRow>
            )}
          
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default App;