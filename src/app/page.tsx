import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="home-parent text-white  py-10 px-20">
      <div className="flex justify-between items-center">
        <h1 className=" text-2xl font-bold  uppercase">Fitness.Gym</h1>
        <Button variant={"outline"} className=" cursor-pointer">
          Sign-in
        </Button>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center h-[80vh]">
        <h1 className="text-6xl">
          <strong>Fitness.</strong>
          <strong className="text-primary">Gym</strong>
        </h1>
        <p className="text-sm font-semibold text-gray-300">
          A perfect gym for you to get fit and healthy with the best trainers
          and equipments.
        </p>
        <Button>Explores Plan</Button>
        <ArrowDown
          size={20}
          color="gray"
          className="animate-bounce cursor-pointer mt-5"
        />
      </div>
    </div>
  );
}
