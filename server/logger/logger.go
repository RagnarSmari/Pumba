package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	Zap *zap.Logger
)

func InitLogger(d bool, f *os.File) {

	pe := zap.NewProductionEncoderConfig()
	pe.EncodeLevel = zapcore.CapitalColorLevelEncoder
	fileEncoder := zapcore.NewJSONEncoder(pe)

	pe.EncodeTime = zapcore.ISO8601TimeEncoder
	consoleEncoder := zapcore.NewConsoleEncoder(pe)

	level := zap.InfoLevel
	if d {
		level = zap.DebugLevel
	}

	core := zapcore.NewTee(
		zapcore.NewCore(fileEncoder, zapcore.AddSync(f), level),
		zapcore.NewCore(consoleEncoder, zapcore.AddSync(os.Stdout), level),
	)

	Zap = zap.New(core, zap.AddCallerSkip(1))
	zap.ReplaceGlobals(Zap)
}

func S() *zap.SugaredLogger {
	return Zap.Sugar()
}
