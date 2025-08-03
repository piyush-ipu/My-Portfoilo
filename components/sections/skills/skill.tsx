import { motion } from "framer-motion";

interface Props {
  icon: string;
  name: string;
}

export const Skill = ({ icon, name }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 4 }}
      viewport={{ once: false, amount: 1 }}
      className="relative flex gap-2 p-2 border-primary border rounded-lg h-[46px] w-fit overflow-hidden"
    >
      <img src={icon} alt={`${name} icon`} />
      <p className="text-lg">{name}</p>
    </motion.div>
  );
};
