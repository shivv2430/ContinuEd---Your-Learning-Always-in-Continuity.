import React from 'react';
import { FileCheck2, Calendar, Award, CheckCircle2, Clock, PlusCircle } from 'lucide-react';
import { assignmentService } from '../../services/assignmentService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function TeacherAssignments() {
  const assignments = assignmentService.getAssignments();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Assignments Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review assignment submissions, deadlines, and grade evaluations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {asg.subject || 'Data Structures'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{asg.title}</h3>
              </div>
              <Badge variant="indigo">{asg.points || 100} Points</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Due: {asg.dueDate}
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                28 / 34 Submitted
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Reviewing submissions for ${asg.title}`)}
              >
                Review Submissions (28)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
