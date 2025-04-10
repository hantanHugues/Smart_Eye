import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine plusieurs classes CSS en utilisant clsx et tailwind-merge
 * @param inputs - Classes CSS à combiner
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatte un nombre pour l'affichage
 * @param value - Nombre à formater
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(value);
}

/**
 * Tronque un texte à une longueur donnée
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Obtient la couleur CSS appropriée en fonction de la gravité
 * @param severity - Niveau de gravité (critique, urgent, modéré, etc.)
 */
export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case "critique":
      return "danger";
    case "urgent":
      return "warning";
    case "modéré":
      return "info";
    default:
      return "info";
  }
}

/**
 * Obtient la couleur CSS appropriée en fonction du statut
 * @param status - Statut (résolu, en attente, en traitement, etc.)
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "résolu":
    case "resolved":
      return "success";
    case "pending":
    case "en attente":
      return "warning";
    case "processing":
    case "en traitement":
      return "info";
    case "error":
    case "erreur":
      return "danger";
    default:
      return "gray-400";
  }
}

/**
 * Vérifie si l'application est en mode production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Obtient l'icône appropriée pour un type de canal de communication
 * @param channelType - Type de canal (email, sms, whatsapp, telegram)
 */
export function getChannelIcon(channelType: string): string {
  switch (channelType.toLowerCase()) {
    case "email":
      return "ri-mail-line";
    case "sms":
      return "ri-message-2-line";
    case "whatsapp":
      return "ri-whatsapp-line";
    case "telegram":
      return "ri-telegram-line";
    default:
      return "ri-notification-line";
  }
}
