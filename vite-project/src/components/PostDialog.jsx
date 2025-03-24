import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/context/AuthContext";

const PostDialog = () => {

  const { token } = useAuth();

  const [data, setData] = useState({
    title: "",
    content: "",
    images: null
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleInputFiles = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.files
    });
  }

  const handleSubmitForm = async () => {
    const post = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(post);

    // setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2">Publicar Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmitForm} encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle>Crear una publicación</DialogTitle>
            <DialogDescription>Añade título y descripción</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input
                id="title"
                value={data.title}
                name="title"
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="content" className="text-right">Contenido</Label>
              <Textarea
                id="content"
                value={data.content}
                name="content"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="images" className="text-right">Añadir imágenes</Label>
              <Input
                type="file"
                id="images"
                onChange={handleInputFiles}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Publicar Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PostDialog;