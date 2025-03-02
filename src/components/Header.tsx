
import { motion } from "framer-motion";
import { logoAnimation } from "@/lib/motionVariants";

const Header = () => {
  return (
    <motion.header 
      className="flex items-center justify-center w-full pt-10 pb-6"
      initial="hidden"
      animate="visible"
      variants={logoAnimation}
    >
      <div className="flex items-center gap-2 logo-animation">
        <div className="flex items-center">
          {/* YouTube Logo */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.4985 6.49C23.3663 6.01903 23.1142 5.59158 22.7669 5.25205C22.4196 4.91253 21.9878 4.67573 21.515 4.57C19.643 4.19 12.1138 4.19 12.1138 4.19C12.1138 4.19 4.58455 4.19 2.71255 4.57C2.23979 4.67573 1.80798 4.91253 1.46069 5.25205C1.1134 5.59158 0.861365 6.01903 0.729151 6.49C0.346733 8.41286 0.158025 10.3631 0.165351 12.3175C0.158025 14.2719 0.346733 16.2221 0.729151 18.145C0.861365 18.616 1.1134 19.0434 1.46069 19.383C1.80798 19.7225 2.23979 19.9593 2.71255 20.065C4.58455 20.445 12.1138 20.445 12.1138 20.445C12.1138 20.445 19.643 20.445 21.515 20.065C21.9878 19.9593 22.4196 19.7225 22.7669 19.383C23.1142 19.0434 23.3663 18.616 23.4985 18.145C23.8809 16.2221 24.0696 14.2719 24.0623 12.3175C24.0696 10.3631 23.8809 8.41286 23.4985 6.49ZM9.72055 15.895V8.74L16.0745 12.3175L9.72055 15.895Z" fill="#FF0000"/>
            </svg>
          </div>
          <motion.div 
            className="h-0.5 w-8 bg-gradient-to-r from-youtube to-spotify"
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          {/* Spotify Logo */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.4083C16.3733 16.6267 16.0483 16.7267 15.7317 16.7267C15.4067 16.7267 15.09 16.6267 14.8633 16.4083C14.705 16.25 14.5717 16.065 14.4667 15.8633C14.3617 15.6617 14.2833 15.4433 14.2833 15.225C14.2833 15.0067 14.3617 14.7883 14.4667 14.5867C14.5717 14.385 14.705 14.2 14.8633 14.0417C15.09 13.815 15.4067 13.715 15.7317 13.715C16.0483 13.715 16.3733 13.815 16.5917 14.0417C16.75 14.2 16.8833 14.385 16.9883 14.5867C17.0933 14.7883 17.1717 15.0067 17.1717 15.225C17.1717 15.4433 17.0933 15.6617 16.9883 15.8633C16.8833 16.065 16.75 16.25 16.5917 16.4083ZM16.6 13.0533C15.29 12.1483 13.6233 11.8483 11.8633 12.1483C11.515 12.2117 11.1583 12.3033 10.8183 12.42C10.6667 12.475 10.5067 12.4033 10.4517 12.2517C10.3967 12.1 10.4683 11.94 10.62 11.885C11.0067 11.7517 11.41 11.6433 11.8133 11.5733C13.79 11.24 15.6783 11.5817 17.1583 12.6067C17.2933 12.7 17.3183 12.8867 17.225 13.0217C17.1317 13.1567 16.945 13.1817 16.81 13.0883C16.74 13.0767 16.6683 13.065 16.6 13.0533ZM17.8067 10.8517C16.1683 9.71 13.695 9.31 11.485 9.705C11.025 9.785 10.57 9.9 10.135 10.04C9.94167 10.1017 9.74 9.99834 9.68167 9.80334C9.62334 9.60834 9.73 9.40667 9.925 9.34667C10.42 9.195 10.9333 9.06334 11.455 8.97334C13.9533 8.53 16.7483 8.98667 18.6333 10.3333C18.7783 10.4417 18.8217 10.645 18.715 10.7917C18.65 10.8883 18.55 10.935 18.4483 10.935C18.385 10.935 18.3217 10.92 18.2633 10.8883C18.11 10.8767 17.9583 10.865 17.8067 10.8517ZM18.0283 8.555C16.0167 7.175 12.8633 6.70333 10.2017 7.175C9.675 7.265 9.15667 7.39167 8.655 7.555C8.43167 7.62167 8.195 7.50333 8.12833 7.28C8.06167 7.05667 8.18 6.82 8.40333 6.75333C8.96 6.575 9.535 6.43333 10.1217 6.33333C13.0833 5.82 16.5933 6.35 18.9183 7.94C19.125 8.08333 19.1933 8.365 19.05 8.57333C18.9683 8.7 18.8267 8.77 18.68 8.77C18.595 8.77 18.51 8.7475 18.4333 8.70333C18.2983 8.65333 18.1633 8.60333 18.0283 8.555Z" fill="#1DB954"/>
            </svg>
          </div>
        </div>
        <div className="ml-2">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">Tune</span>
            <span className="text-primary">Migrate</span>
          </h1>
          <p className="text-xs text-muted-foreground -mt-1">YouTube to Spotify converter</p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
