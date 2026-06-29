const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatHistory = sequelize.define('ChatHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userMessage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  botResponse: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  intent: {
    type: DataTypes.STRING
  },
  productId: {
    type: DataTypes.INTEGER
  },
  orderId: {
    type: DataTypes.INTEGER
  },
  isHelpful: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = ChatHistory;
