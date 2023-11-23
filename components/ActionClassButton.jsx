import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ActionClassButton({ props, profile }) {
  const submitHandler = async (event) => {
    event.preventDefault();
  };
  const idKelas = props.id.toString();
  const paymentLink = `/payment/${idKelas}`;

  const jadwalKelas = new Date(props.jadwal);
  const tahunKelas = jadwalKelas.getFullYear();
  const bulanKelas = jadwalKelas.getMonth();
  const tanggalKelas = jadwalKelas.getDate();

  return (
    <div>
      <Dialog>
        {profile.role !== "admin" ? (
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="yellow_outline"
              className="ml-[240px] md:ml-[280px]"
            >
              Register
            </Button>
          </DialogTrigger>
        ) : (
          <Button
            type="button"
            variant="destructive"
            className="ml-[240px] md:ml-[280px]"
          >
            Delete
          </Button>
        )}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{props.tipe}</DialogTitle>
            <DialogDescription>{props.instruktur}</DialogDescription>
          </DialogHeader>
          <hr></hr>
          <p className="text-lg mt-[20px]">{props.deskripsi}</p>
          <div className="flex justify-between mt-[40px]">
            <p className="font-bold">Jadwal</p>
            <p>
              {tanggalKelas} {bulanKelas} {tahunKelas}
            </p>
          </div>
          <div className="flex justify-between ">
            <p className="font-bold">Harga</p>
            <p>{props.harga}</p>
          </div>
          <div className="inline-flex items-center justify-center w-full mt-[10px]">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3  font-medium bg-black -translate-x-[4px] text-white ">
              Daftar
            </span>
          </div>
          <form className="" onSubmit={submitHandler}>
            <div className="flex justify-center">
              {!profile || profile.role === "NM" ? (
                <Link href={paymentLink}>
                  <Button
                    variant="yellow_full"
                    className=" w-full py-3"
                    type="submit"
                  >
                    Lanjut ke Pembayaran
                  </Button>
                </Link>
              ) : (
                <Link href={paymentLink}>
                  <Button
                    variant="yellow_full"
                    className=" w-full py-3"
                    type="submit"
                  >
                    Daftar
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}